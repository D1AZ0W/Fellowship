from django.contrib.auth import get_user_model
from rest_framework import serializers

from groups.models import GroupMembers

from .models import Expense, ExpenseParticipants

User = get_user_model()


class CreateExpenseSerializer(serializers.ModelSerializer):
	participants = serializers.ListField(
		child=serializers.IntegerField(), write_only=True
	)

	class Meta:
		model = Expense
		fields = [
			'title',
			'image',
			'amount',
			'category',
			'split_type',
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
		group = attrs.get('group')
		paid_by = attrs.get('paid_by')
		participants = self.initial_data.get('participants', [])
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
				group=group, user_id=user_id
			).exists():
				raise serializers.ValidationError(
					{f'User {user_id} is not a member of this group.'}
				)
		return attrs

	def create(self, validated_data):
		participants = validated_data.pop('participants')
		expense = Expense.objects.create(**validated_data)
		each_amount = expense.amount / len(participants)
		for user_id in participants:
			user = User.objects.get(pk=user_id)
			ExpenseParticipants.objects.create(
				expense=expense, user=user, amount_owed=each_amount
			)
		return expense


class GroupExpenseSerializer(serializers.ModelSerializer):
	paid_by = serializers.CharField(
		source='paid_by.username',
		read_only=True,
	)

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
			'paid_by',
		]
