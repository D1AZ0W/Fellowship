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
		if validated_data['split_type'] == 'Equal':
			each_amount = expense.amount / len(participants)
		# elif validated_data['split_type']== 'Exact':
		# elif validated_data['split_type'] == 'Percentage':

		for user_id in participants:
			user = User.objects.get(pk=user_id)
			ExpenseParticipants.objects.create(
				expense=expense, user=user, amount_owed=each_amount
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
			'paid_by',
		]

	def validate_paid_by(self, value):
		expense = self.instance
		if not ExpenseParticipants.objects.filter(
			expense=expense,
			user=value,
		).exists():
			raise serializers.ValidationError(
				'Payer must be one of the participants.'
			)
		return value
