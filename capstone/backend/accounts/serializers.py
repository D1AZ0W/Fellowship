from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import (
	DjangoUnicodeDecodeError,
	force_bytes,
	smart_str,
)
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import serializers

from .utils import Util

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

		return user


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
	old_password = serializers.CharField(
		write_only=True, style={'input_type': 'password'}
	)
	password = serializers.CharField(
		write_only=True, min_length=8, style={'input_type': 'password'}
	)
	confirm_password = serializers.CharField(
		write_only=True, style={'input_type': 'password'}
	)

	class Meta:
		fields = ['old_password', 'password', 'confirm_password']

	def validate_old_password(self, value):
		user = self.context['user']
		if not user.check_password(value):
			raise serializers.ValidationError('Old password is incorrect.')
		return value

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


class UpdateProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = [
			'first_name',
			'last_name',
			'username',
			'email',
			'profile_picture',
		]

	def validate_username(self, value):
		user = self.instance
		if User.objects.exclude(id=user.id).filter(username=value).exists():
			raise serializers.ValidationError('Username already exists.')
		return value

	def validate_emai(self, value):
		user = self.instance
		if User.objects.exclude(id=user.id).filter(email=value).exists():
			raise serializers.ValidationError('Email already exists.')
		return value


class SendPasswordResetEmailSerializer(serializers.Serializer):
	email = serializers.EmailField(max_length=255)

	class Meta:
		fields = ['email']

	def validate(self, attrs):
		email = attrs.get('email')
		if not User.objects.filter(email=email).exists():
			raise serializers.ValidationError('You are not a registered user')
		user = User.objects.get(email=email)
		id = urlsafe_base64_encode(force_bytes(user.id))
		token = PasswordResetTokenGenerator().make_token(user)
		link = 'http://localhost:3000/reset-password/' + id + '/' + token
		data = {
			'subject': 'Reset your password',
			'body': 'Find the link below to reset your password: ' + link,
			'to_email': email,
		}
		Util.send_email(data)
		return attrs


class PasswordResetSerializer(serializers.Serializer):
	password = serializers.CharField(
		write_only=True, min_length=8, style={'input_type': 'password'}
	)
	confirm_password = serializers.CharField(
		write_only=True, style={'input_type': 'password'}
	)

	class Meta:
		fields = ['password', 'confirm_password']

	def validate(self, attrs):
		try:
			password = attrs.get('password')
			confirm_password = attrs.get('confirm_password')
			id = self.context['id']
			token = self.context['token']
			if password != confirm_password:
				raise serializers.ValidationError(
					"Password and Confirm Password doesn't match."
				)
			id = smart_str(urlsafe_base64_decode(id))
			user = User.objects.get(id=id)
			if not PasswordResetTokenGenerator().check_token(user, token):
				raise serializers.ValidationError('Invalid or Expired token.')
			user.set_password(password)
			user.save()
			return attrs
		except DjangoUnicodeDecodeError:
			PasswordResetTokenGenerator().check_token(user, token)
			raise serializers.ValidationError('Invalid or Expired token.')
