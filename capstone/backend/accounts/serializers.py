from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
	password = serializers.CharField(write_only=True, min_length=8)
	confirm_password = serializers.CharField(write_only=True)

	class Meta:
		model = User
		fields = [
			'username',
			'first_name',
			'last_name',
			'email',
			'profile_picture',
			'password',
			'confirm_password',
		]

	def validate(self, attrs):
		password = attrs.get('password')
		confirm_password = attrs.get('confirm_password')
		if password != confirm_password:
			raise serializers.ValidationError(
				"Password and Confirm Password doesn't match"
			)
		return attrs

	def create(self, validated_data):
		validated_data.pop('confirm_password')
		password = validated_data.pop('password')

		user = User(**validated_data)
		user.set_password(password)
		user.save()


class LoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField(
		write_only=True,
		style={'input_type': 'password'},
	)


class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = [
			'id',
			'username',
			'first_name',
			'last_name',
			'email',
			'profile_picture',
		]


class ChangePasswordSerializer(serializers.Serializer):
	password = serializers.CharField(
		write_only=True, min_length=8, style={'input_type': 'password'}
	)
	confirm_password = serializers.CharField(
		write_only=True, style={'input_type': 'password'}
	)

	class Meta:
		fields = ['password', 'confirm_password']

	def validate(self, attrs):
		password = attrs.get('password')
		confirm_password = attrs.get('confirm_password')
		user = self.context['user']
		if password != confirm_password:
			raise serializers.ValidationError(
				"Password and Confirm Password doesn't match"
			)
		user.set_password(password)
		user.save()
		return attrs
