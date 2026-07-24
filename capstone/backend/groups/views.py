from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .renderers import GroupRenderer
from .serializers import GroupSerializer


# Create your views here.
class CreateGroupView(APIView):
	permission_classes = [IsAuthenticated]
	renderer_classes = [GroupRenderer]

	def post(self, request):
		serializer = GroupSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		group = serializer.save(created_by=request.user)
		return Response(
			{
				'message': 'Group created successfully.',
				'group': GroupSerializer(group).data,
			},
			status=status.HTTP_201_CREATED,
		)
