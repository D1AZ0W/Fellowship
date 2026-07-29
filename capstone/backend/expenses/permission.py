from django.shortcuts import get_object_or_404
from rest_framework.permissions import BasePermission

from groups.models import GroupMembers

from .models import Expense, ExpenseParticipants


class IsParticipant(BasePermission):
	message = 'You are not a participant of this expense.'

	def has_permission(self, request, view):
		expense_id = view.kwargs.get('pk')
		participant_check = ExpenseParticipants.objects.filter(
			expense_id=expense_id, user=request.user
		).exists()
		paid_by_check = Expense.objects.filter(
			pk=expense_id, paid_by=request.user
		).exists()

		return participant_check or paid_by_check


class IsGroupMember(BasePermission):
	def has_permission(self, request, view):
		expense = get_object_or_404(Expense, pk=view.kwargs['pk'])

		return GroupMembers.objects.filter(
			group=expense.group,
			user=request.user,
		).exists()
