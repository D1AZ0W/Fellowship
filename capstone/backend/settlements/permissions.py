from django.shortcuts import get_object_or_404
from rest_framework.permissions import BasePermission

from groups.models import GroupMembers, Groups


class IsGroupMember(BasePermission):
	message = 'You are not a member of this group.'

	def has_permission(self, request, view):
		group_id = view.kwargs.get('pk') or request.data.get('group')
		if not group_id:
			return False
		group = get_object_or_404(Groups, pk=group_id)
		return GroupMembers.objects.filter(
			group=group,
			user=request.user,
		).exists()
