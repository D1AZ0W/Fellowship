import heapq
from decimal import Decimal

from expenses.models import Expense
from groups.models import GroupMembers

from .models import Settlement


def group_balance(group):
	members = GroupMembers.objects.filter(group=group)
	balances = {member.user.id: Decimal('0.00') for member in members}
	expenses = Expense.objects.filter(group=group)
	for expense in expenses:
		balances[expense.paid_by.id] += expense.amount
		for participant in expense.participants.all():
			balances[participant.user.id] -= participant.amount_owed
	settlements = Settlement.objects.filter(group=group)

	for s in settlements:
		balances[s.payer.id] += s.amount
		balances[s.recipient.id] -= s.amount
	data = []
	for member in members:
		data.append(
			{
				'user_id': member.user.id,
				'username': member.user.username,
				'balance': str(balances[member.user.id]),
			}
		)
	return data


def get_transactions(group):
	to_give = []
	to_receive = []
	balances = group_balance(group)
	for user_id, balance in balances.items():
		if balance > 0:
			to_receive.append((-balance, user_id))
		elif balance < 0:
			to_give.append((balance, user_id))
	heapq.heapify(to_receive)
	heapq.heapify(to_give)
