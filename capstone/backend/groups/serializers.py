from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers

from activity.services import create_activity

from .models import GroupMembers, Groups

User = get_user_model()


class CreateGroupSerializer(serializers.ModelSerializer):
	class Meta:
		model = Groups
		fields = ['name', 'image', 'type', 'created_at', 'edited_at']
		read_only_fields = ['id', 'created_at', 'edited_at']

	@transaction.atomic
	def create(self, validated_data):
		created_by = validated_data.pop('created_by')
		group = Groups.objects.create(**validated_data)
		GroupMembers.objects.create(
			user=created_by,
			group=group,
			role='Owner',
		)
		create_activity(
			group=group,
			activity_type='GC',
			done_by=created_by,
			description='Created a group named ' + validated_data['name'],
		)

		return group


class GroupListSerializer(serializers.ModelSerializer):
	class Meta:
		model = Groups
		fields = ['id', 'name', 'image', 'type', 'created_at']


class GroupMemberSerializer(serializers.ModelSerializer):
	id = serializers.IntegerField(source='user.id')
	username = serializers.CharField(source='user.username')
	first_name = serializers.CharField(source='user.first_name')
	last_name = serializers.CharField(source='user.last_name')
	profile_picture = serializers.ImageField(source='user.profile_picture')

	class Meta:
		model = GroupMembers
		fields = [
			'id',
			'username',
			'first_name',
			'last_name',
			'profile_picture',
			'role',
			'joined_date',
		]


class ViewGroupSerializer(serializers.ModelSerializer):
	role = serializers.SerializerMethodField()
	members = GroupMemberSerializer(many=True, read_only=True)

	class Meta:
		model = Groups
		fields = [
			'id',
			'name',
			'image',
			'type',
			'created_at',
			'role',
			'members',
		]

	def get_role(self, obj):
		user = self.context['request'].user
		member = GroupMembers.objects.get(user=user, group=obj)
		return member.role


class InviteGroupSerializer(serializers.Serializer):
	username = serializers.CharField()

	def validate_username(self, value):
		try:
			return User.objects.get(username=value)
		except User.DoesNotExist:
			raise serializers.ValidationError('User does not exist')

	@transaction.atomic
	def save(self, **kwargs):
		group = kwargs['group']
		user = self.validated_data['username']
		if GroupMembers.objects.filter(user=user, group=group).exists():
			raise serializers.ValidationError(
				'User is already a member of this group'
			)
		GroupMembers.objects.create(user=user, group=group, role='Member')
		create_activity(
			group=group,
			done_by=kwargs['done_by'],
			activity_type='MA',
			description=f'Added {user.username} to the group',
		)
		return user


class EditGroupSerializer(serializers.ModelSerializer):
	class Meta:
		model = Groups
		fields = ['name', 'image', 'type']


class MakeOwnerSerializer(serializers.Serializer):
	username = serializers.CharField()

	def validate_username(self, value):
		try:
			return User.objects.get(username=value)
		except User.DoesNotExist:
			raise serializers.ValidationError('User does not exist')

	@transaction.atomic
	def save(self, **kwargs):
		group = kwargs['group']
		current_owner = kwargs['owner']
		new_owner = self.validated_data['username']
		try:
			new_owner_group = GroupMembers.objects.get(
				user=new_owner, group=group
			)
		except GroupMembers.DoesNotExist:
			raise serializers.ValidationError(
				'User is not a member of this group'
			)
		current_owner_group = GroupMembers.objects.get(
			user=current_owner, group=group
		)
		create_activity(
			group=group,
			done_by=current_owner,
			activity_type='TO',
			description=f'Transferred ownership to {new_owner.username}',
		)
		current_owner_group.role = 'Member'
		new_owner_group.role = 'Owner'
		current_owner_group.save()
		new_owner_group.save()

		return new_owner


class GroupKickSerializer(serializers.Serializer):
	username = serializers.CharField()

	def validate_username(self, value):
		try:
			return User.objects.get(username=value)
		except User.DoesNotExist:
			raise serializers.ValidationError('User does not exist')

	@transaction.atomic
	def save(self, **kwargs):
		group = kwargs['group']
		user = self.validated_data['username']
		try:
			member = GroupMembers.objects.get(group=group, user=user)
		except GroupMembers.DoesNotExist:
			raise serializers.ValidationError('User does not exist')
		if member.role == 'Owner':
			raise serializers.ValidationError('Owner cannot be removed')
		member.delete()
		create_activity(
			group=group,
			done_by=kwargs['done_by'],
			activity_type='MR',
			description=f'Removed {user.username} from the group',
		)

		return user


class LeaveGroupSerializer(serializers.Serializer):
	@transaction.atomic
	def save(self, **kwargs):
		group = kwargs['group']
		user = kwargs['user']
		try:
			member = GroupMembers.objects.get(
				group=group,
				user=user,
			)
		except GroupMembers.DoesNotExist:
			raise serializers.ValidationError('Not a member of this group.')

		if member.role == 'Owner':
			raise serializers.ValidationError(
				'Transfer ownership or delete the group before leaving.'
			)

		member.delete()
		create_activity(
			group=group,
			done_by=user,
			activity_type='ML',
			description='Left the group',
		)
		return user
