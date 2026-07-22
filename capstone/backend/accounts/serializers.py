from django.contrib.auth import authenticate, get_user_model
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
			'password',
			'confirm_password',
			'profile_picture',
		]

	def validate(self, attrs):
		if attrs['password'] != attrs['confirm_password']:
			raise serializers.ValidationError(
				{'confirm_password': 'Passwords do not match.'}
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

	def validate(self, attrs):
		username = attrs.get('username')
		password = attrs.get('password')
		user = authenticate(
			username=username,
			password=password,
		)

		if user is None:
			raise serializers.ValidationError('Invalid username or password.')

		attrs['user'] = user
		return attrs
