from decimal import Decimal

from django.contrib.auth import get_user_model
from rest_framework import serializers

from groups.models import GroupMembers

from .models import Expense, ExpenseParticipants

User = get_user_model()


class UserAmountSerializer(serializers.Serializer):
	user_id = serializers.IntegerField()
	amount = serializers.DecimalField(
		max_digits=10,
		decimal_places=2,
	)


class CreateExpenseSerializer(serializers.ModelSerializer):
	participants = serializers.ListField(
		child=serializers.IntegerField(),
		write_only=True,
	)

	user_amounts = UserAmountSerializer(
		many=True, required=False, write_only=True
	)

	class Meta:
		model = Expense
		fields = [
			'title',
			'image',
			'amount',
			'category',
			'split_type',
			'user_amounts',
			'expense_date',
			'note',
			'created_at',
			'edited_at',
			'paid_by',
			'group',
			'participants',
		]
		read_only_fields = ['id', 'created_at', 'edited_at']

	def validate(self, attrs):
		group = attrs['group']
		paid_by = attrs['paid_by']
		participants = attrs.get('participants', [])
		user_amounts = attrs.get('user_amounts', [])
		split_type = attrs['split_type']
		total_amount = attrs['amount']

		if not participants:
			raise serializers.ValidationError(
				{'Select at least one participant.'}
			)

		if not GroupMembers.objects.filter(group=group, user=paid_by).exists():
			raise serializers.ValidationError(
				{'Selected payer is not a member of this group.'}
			)

		for user_id in participants:
			if not GroupMembers.objects.filter(
				group=group,
				user_id=user_id,
			).exists():
				raise serializers.ValidationError(
					{f'User {user_id} is not a member of this group.'}
				)

		if split_type != 'Equal':
			if len(user_amounts) != len(participants):
				raise serializers.ValidationError(
					{'Provide values for every participant.'}
				)

			for item in user_amounts:
				if item['user_id'] not in participants:
					raise serializers.ValidationError(
						{'Every user_amount must belong to a participant.'}
					)

		if split_type == 'Exact':
			total = sum(item['amount'] for item in user_amounts)
			if total != total_amount:
				raise serializers.ValidationError(
					{'Exact amounts must equal the total expense.'}
				)

		elif split_type == 'Percentage':
			total = sum(item['amount'] for item in user_amounts)
			if total != 100:
				raise serializers.ValidationError(
					{'Percentages must add up to 100.'}
				)

		return attrs

	def create(self, validated_data):
		participants = validated_data.pop('participants')
		user_amounts = validated_data.pop('user_amounts', [])
		split_type = validated_data['split_type']
		total_amount = validated_data['amount']
		expense = Expense.objects.create(**validated_data)
		if split_type == 'Equal':
			each_amount = total_amount / len(participants)
			for user_id in participants:
				ExpenseParticipants.objects.create(
					expense=expense,
					user_id=user_id,
					amount_owed=each_amount,
				)
		elif split_type == 'Exact':
			for item in user_amounts:
				ExpenseParticipants.objects.create(
					expense=expense,
					user_id=item['user_id'],
					amount_owed=item['amount'],
				)
		elif split_type == 'Percentage':
			for item in user_amounts:
				ExpenseParticipants.objects.create(
					expense=expense,
					user_id=item['user_id'],
					amount_owed=(item['amount'] / 100) * total_amount,
				)
		return expense


class PaidBySerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = [
			'id',
			'username',
			'first_name',
			'last_name',
			'profile_picture',
		]


class GroupExpenseSerializer(serializers.ModelSerializer):
	paid_by = PaidBySerializer(read_only=True)

	class Meta:
		model = Expense
		fields = [
			'id',
			'title',
			'image',
			'amount',
			'category',
			'expense_date',
			'paid_by',
		]


class ParticipantsSerializer(serializers.ModelSerializer):
	id = serializers.IntegerField(source='user.id')
	username = serializers.CharField(source='user.username')
	first_name = serializers.CharField(source='user.first_name')
	last_name = serializers.CharField(source='user.last_name')
	profile_picture = serializers.ImageField(source='user.profile_picture')

	class Meta:
		model = ExpenseParticipants
		fields = [
			'id',
			'username',
			'first_name',
			'last_name',
			'profile_picture',
			'amount_owed',
		]


class DetailExpenseSerializer(serializers.ModelSerializer):
	participants = ParticipantsSerializer(many=True, read_only=True)
	paid_by = PaidBySerializer(read_only=True)

	class Meta:
		model = Expense
		fields = [
			'id',
			'title',
			'image',
			'amount',
			'category',
			'split_type',
			'expense_date',
			'note',
			'paid_by',
			'participants',
			'created_at',
			'edited_at',
		]


class EditExpenseSerializer(serializers.ModelSerializer):
	user_amounts = serializers.JSONField(required=False)

	class Meta:
		model = Expense
		fields = [
			'title',
			'image',
			'amount',
			'category',
			'split_type',
			'user_amounts',
			'expense_date',
			'note',
			'paid_by',
		]

	def validate(self, attrs):
		expense = self.instance
		participants = list(
			ExpenseParticipants.objects.filter(expense=expense).values_list(
				'user_id', flat=True
			)
		)
		split_type = attrs.get('split_type', expense.split_type)
		user_amounts = attrs.get('user_amounts', [])
		total_amount = attrs.get('amount', expense.amount)

		if split_type != 'Equal':
			if len(user_amounts) != len(participants):
				raise serializers.ValidationError(
					{'Provide values for every participant.'}
				)
			for item in user_amounts:
				if item['user_id'] not in participants:
					raise serializers.ValidationError(
						{'Cannot add or remove participants.'}
					)

		if split_type == 'Exact':
			total = sum(item['amount'] for item in user_amounts)
			if total != total_amount:
				raise serializers.ValidationError(
					{'Exact amounts must equal the expense amount.'}
				)

		elif split_type == 'Percentage':
			total = sum(item['amount'] for item in user_amounts)
			if total != 100:
				raise serializers.ValidationError(
					{'Percentages must add up to 100.'}
				)

		return attrs

	def update(self, instance, validated_data):
		user_amounts = validated_data.pop('user_amounts', [])
		for attr, value in validated_data.items():
			setattr(instance, attr, value)
		instance.save()

		participants = list(
			ExpenseParticipants.objects.filter(expense=instance).values_list(
				'user_id', flat=True
			)
		)
		ExpenseParticipants.objects.filter(expense=instance).delete()

		if instance.split_type == 'Equal':
			each_amount = instance.amount / len(participants)

			for user_id in participants:
				ExpenseParticipants.objects.create(
					expense=instance,
					user_id=user_id,
					amount_owed=each_amount,
				)

		elif instance.split_type == 'Exact':
			for item in user_amounts:
				ExpenseParticipants.objects.create(
					expense=instance,
					user_id=item['user_id'],
					amount_owed=item['amount'],
				)

		else:
			for item in user_amounts:
				ExpenseParticipants.objects.create(
					expense=instance,
					user_id=item['user_id'],
					amount_owed=(
						instance.amount * item['amount'] / Decimal(100)
					),
				)

		return instance
