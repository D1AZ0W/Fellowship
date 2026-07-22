from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer, RegisterSerializer


# Create your views here.
class RegisterView(APIView):
	def post(self, request):
		serializer = RegisterSerializer(data=request.data)

		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
	def post(self, request):
		serializer = LoginSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data['user']  # type: ignore
		refresh = RefreshToken.for_user(user)

		return Response(
			{
				'refresh': str(refresh),
				'access': str(refresh.access_token),
			},
			status=status.HTTP_200_OK,
		)
