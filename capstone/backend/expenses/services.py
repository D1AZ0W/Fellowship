from decimal import Decimal

from .models import ExpenseParticipants


def expense_participants_create(
	expense, split_type, total_amount, participants, user_amounts, create
):
	if create:
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
					amount_owed=(item['amount'] / Decimal(100)) * total_amount,
				)

	else:
		if split_type == 'Equal':
			each_amount = total_amount / len(participants)
			for user_id in participants:
				ExpenseParticipants.objects.filter(
					expense=expense, user_id=user_id
				).update(amount_owed=each_amount)

		elif split_type == 'Exact':
			for item in user_amounts:
				ExpenseParticipants.objects.filter(
					expense=expense, user_id=item['user_id']
				).update(amount_owed=item['amount'])

		else:
			for item in user_amounts:
				ExpenseParticipants.objects.filter(
					expense=expense, user_id=item['user_id']
				).update(
					amount_owed=(item['amount'] / Decimal(100)) * total_amount
				)
