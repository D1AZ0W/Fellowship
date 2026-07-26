from rest_framework.permissions import BasePermission

from .models import GroupMembers


class IsOwner(BasePermission):
	message = 'Only the group owner can perform this action.'

	def has_permission(self, request, view):
		group_id = view.kwargs.get('pk')

		return GroupMembers.objects.filter(
			group_id=group_id,
			user=request.user,
			role='Owner',
		).exists()
