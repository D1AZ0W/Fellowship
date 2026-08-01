from datetime import date
from decimal import Decimal

from django.db.models import Count, Sum

from expenses.models import Expense
from groups.models import GroupMembers
from settlements.services import get_transactions, group_balance


def dashboard_summary(user):
	groups = GroupMembers.objects.filter(user=user)
	owe = Decimal('0.00')
	owed = Decimal('0.00')
	for member in groups:
		balances = group_balance(member.group)
		balance = Decimal('0.00')
		for b in balances:
			if b['user_id'] == user.id:
				balance = Decimal(str(b['balance']))
				break
		if balance > 0:
			owed += balance
		else:
			owe += abs(balance)
	return {
		'owe': float(owe),
		'owed': float(owed),
		'net_balance': float(owed - owe),
	}


def dashboard_groups(user):
	groups = GroupMembers.objects.filter(user=user)
	data = []
	for member in groups:
		balances = group_balance(member.group)
		balance = Decimal('0.00')
		for b in balances:
			if b['user_id'] == user.id:
				balance = Decimal(str(b['balance']))
				break
		data.append(
			{
				'id': member.group.id,
				'name': member.group.name,
				'members': member.group.members.count(),
				'balance': float(balance),
			}
		)
	return data


def dashboard_transactions(user):
	groups = GroupMembers.objects.filter(user=user)
	suggestions = []
	for member in groups:
		transactions = get_transactions(member.group)
		for t in transactions:
			if t['payer'] != user.id and t['recipient'] != user.id:
				continue
			t['group'] = {
				'id': member.group.id,
				'name': member.group.name
			}
			suggestions.append(t)

	suggestions.sort(key=lambda t: t['amount'], reverse=True)
	return suggestions[:5]


def dashboard_monthly(user):
	today = date.today()
	reports = []
	for i in range(6):
		month_index = today.month - 1 - i
		year = today.year + month_index // 12
		month = month_index % 12 + 1
		stats = Expense.objects.filter(
			paid_by=user,
			expense_date__year=year,
			expense_date__month=month,
		).aggregate(
			total_spent=Sum('amount'),
			total_expenses=Count('id'),
		)
		reports.append(
			{
				'month': date(year, month, 1).strftime('%B'),
				'year': year,
				'total_spent': float(stats['total_spent'] or 0),
				'total_expenses': stats['total_expenses'] or 0,
			}
		)
	return list(reversed(reports))


def dashboard_category_report(user):
	today = date.today()
	year = today.year
	month = today.month
	expenses = Expense.objects.filter(
		paid_by=user, expense_date__year=year, expense_date__month=month
	)
	categories = expenses.values('category')
	expenses = categories.annotate(amount=Sum('amount'))
	report = expenses.order_by('-amount')
	return [
		{'category': row['category'], 'amount': float(row['amount'])}
		for row in report
	]
