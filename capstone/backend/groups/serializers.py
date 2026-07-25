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


class ViewGroupSerializer(serializers.ModelSerializer):
	role = serializers.SerializerMethodField()

	class Meta:
		model = Groups
		fields = ['id', 'name', 'image', 'type', 'created_at', 'role']

	def get_role(self, obj):
		user = self.context['request'].user
		member = GroupMembers.objects.get(user=user, group=obj)
		return member.role
