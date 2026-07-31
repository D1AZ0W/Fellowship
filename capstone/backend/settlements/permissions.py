from django.shortcuts import get_object_or_404
from rest_framework.permissions import BasePermission

from groups.models import GroupMembers, Groups


class IsGroupMember(BasePermission):
	message = 'You are not a member of this group.'

	def has_permission(self, request, view):
		group = get_object_or_404(Groups, pk=view.kwargs['pk'])
		return GroupMembers.objects.filter(
			group=group,
			user=request.user,
		).exists()
