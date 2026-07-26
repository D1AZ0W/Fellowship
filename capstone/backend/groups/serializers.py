from rest_framework import serializers

from .models import GroupMembers, Groups


class CreateGroupSerializer(serializers.ModelSerializer):
	class Meta:
		model = Groups
		fields = ['name', 'image', 'type', 'created_at', 'edited_at']
		read_only_fields = ['id', 'created_at', 'edited_at']

	def create(self, validated_data):
		created_by = validated_data.pop('created_by')
		group = Groups.objects.create(**validated_data)
		GroupMembers.objects.create(
			user=created_by,
			group=group,
			role='Owner',
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


# class InviteGroupSerializer(serializers.Serializer):
# 	username = serializers.CharField()
# 	Users = get_user_model()

# 	def validate_username(self, value):
# 		try:
# 			return Users.objects.get(username=value)
# 		except Users.DoesNotExist:
# 			raise serializers.ValidationError('User does not exist')
# 	def save(self, **kwargs):
# 		group = kwargs['group']
# 		user = self.validated_data['username']
# 		if GroupMembers.objects.filter(user=user ,group=group).exists():
# 			raise seria


class EditGroupSerializer(serializers.ModelSerializer):
	class Meta:
		model = Groups
		fields = ['name', 'image', 'type']
