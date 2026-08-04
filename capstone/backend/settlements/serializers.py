from decimal import Decimal

from django.db import transaction
from rest_framework import serializers

from activity.services import create_activity
from expenses.serializers import PaidBySerializer
from groups.models import GroupMembers

from .models import Settlement, SettlementImage
from .services import group_balance


class ImageSettlementSerializer(serializers.ModelSerializer):
	class Meta:
		model = SettlementImage
		fields = ['id', 'image', 'created_at']
		read_only_fields = ['id', 'created_at']


class CreateSettlementSerializer(serializers.ModelSerializer):
	images = serializers.ListField(
		child=serializers.ImageField(), required=False, write_only=True
	)

	class Meta:
		model = Settlement
		fields = [
			'group',
			'payer',
			'recipient',
			'amount',
			'note',
			'images',
			'created_by',
		]
		read_only_fields = ['created_by']

	def validate(self, attrs):
		payer = attrs['payer']
		recipient = attrs['recipient']
		group = attrs['group']
		amount = attrs['amount']
		if payer == recipient:
			raise serializers.ValidationError(
				'You cannot settle payment with yourself.'
			)
		if not GroupMembers.objects.filter(user=payer, group=group).exists():
			raise serializers.ValidationError('Payer not in the group.')
		if not GroupMembers.objects.filter(user=recipient, group=group):
			raise serializers.ValidationError('Recipient not in the group')
		if amount <= Decimal('0.00'):
			raise serializers.ValidationError(
				'Settlement amount must be greater than zero.'
			)

		for balance in group_balance(group.id):
			if balance['user_id'] == payer.id:
				payer_balance = Decimal(balance['balance'])
				break
		if payer_balance >= 0:
			raise serializers.ValidationError(
				'You do not owe any money in this group.'
			)
		# max_allowed = Decimal(str(abs(payer_balance)))
		# if amount > max_allowed:
		# 	raise serializers.ValidationError(
		# 		f'You cannot settle more than what you owe (Rs. {abs(payer_balance):.2f}).'
		# 	)

		return attrs

	@transaction.atomic  # so that incomplete transaction dont commit
	def create(self, validated_data):
		images = validated_data.pop('images', [])
		validated_data['created_by'] = self.context['request'].user
		settlement = Settlement.objects.create(**validated_data)
		# done in order to handle multiple images and insert
		SettlementImage.objects.bulk_create(
			[
				SettlementImage(
					settlement=settlement,
					image=image,
				)
				for image in images
			]
		)
		create_activity(
			group=settlement.group,
			done_by=settlement.created_by,
			activity_type='SC',
			description=(
				f'Settled Rs. {settlement.amount:.2f} '
				f'with {settlement.recipient.username}'
			),
		)

		return settlement


class ListSettlementSerializer(serializers.ModelSerializer):
	payer = PaidBySerializer(read_only=True)
	recipient = PaidBySerializer(read_only=True)
	images = ImageSettlementSerializer(many=True, read_only=True)

	class Meta:
		model = Settlement
		fields = [
			'id',
			'group',
			'payer',
			'recipient',
			'amount',
			'note',
			'images',
			'created_by',
			'created_at',
		]
