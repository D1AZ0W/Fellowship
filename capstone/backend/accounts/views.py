from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

from .renderers import UserRenderer
from .serializers import (
	ChangePasswordSerializer,
	LoginSerializer,
	ProfileSerializer,
	RegisterSerializer,
)


# Generate Token Manually:
def get_tokens_for_user(user):
	if not user.is_active:
		raise AuthenticationFailed('User is not active')

	return RefreshToken.for_user(user)


# Create your views here.
class RegisterView(APIView):
	renderer_classes = [UserRenderer]

	def post(self, request):
		serializer = RegisterSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		refresh = get_tokens_for_user(user)
		response = Response(
			{'msg': 'Registration Successful'},
			status=status.HTTP_201_CREATED,
		)
		response.set_cookie(
			key='access_token',
			value=str(refresh.access_token),
			httponly=True,
			secure=False,
			samesite='Lax',
		)
		response.set_cookie(
			key='refresh_token',
			value=str(refresh),
			httponly=True,
			secure=False,
			samesite='Lax',
		)

		return response


class LoginView(APIView):
	renderer_classes = [UserRenderer]

	def post(self, request):
		serializer = LoginSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		username = serializer.validated_data.get('username')
		password = serializer.validated_data.get('password')
		user = authenticate(username=username, password=password)
		if user is None:
			return Response(
				{
					'errors': {
						'non_field_errors': [
							'Username or Password is not Valid'
						]
					}
				},
				status=status.HTTP_404_NOT_FOUND,
			)

		refresh = get_tokens_for_user(user)
		response = Response(
			{'msg': 'Login Success'},
			status=status.HTTP_200_OK,
		)
		response.set_cookie(
			key='access_token',
			value=str(refresh.access_token),
			httponly=True,
			secure=False,
			samesite='Lax',
			max_age=60 * 45,
		)
		response.set_cookie(
			key='refresh_token',
			value=str(refresh),
			httponly=True,
			secure=False,
			samesite='Lax',
		)

		return response


class ProfileView(APIView):
	renderer_classes = [UserRenderer]
	permission_classes = [IsAuthenticated]

	def get(self, request, format=None):
		serializer = ProfileSerializer(request.user)
		return Response(serializer.data, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
	renderer_classes = [UserRenderer]
	permission_classes = [IsAuthenticated]

	def post(self, request, format=None):
		serializer = ChangePasswordSerializer(
			data=request.data, context={'user': request.user}
		)
		serializer.is_valid(raise_exception=True)
		return Response(
			{'msg': 'Password Changed Successfully'}, status=status.HTTP_200_OK
		)


class LogoutView(APIView):
	renderer_classes = [UserRenderer]
	permission_classes = [IsAuthenticated]

	def post(self, request):
		response = Response(
			{'msg': 'Logged out successfully'},
			status=status.HTTP_200_OK,
		)
		response.delete_cookie('access_token')
		response.delete_cookie('refresh_token')
		return response
