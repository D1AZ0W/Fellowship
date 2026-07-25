from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Groups
from .pagination import GroupPagination
from .renderers import GroupRenderer
from .serializers import (
	CreateGroupSerializer,
	GroupListSerializer,
	ViewGroupSerializer,
)


# Create your views here.
class CreateGroupView(APIView):
	permission_classes = [IsAuthenticated]
	renderer_classes = [GroupRenderer]

	def post(self, request):
		serializer = CreateGroupSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		group = serializer.save(created_by=request.user)
		return Response(
			{
				'message': 'Group created successfully.',
				'group': CreateGroupSerializer(group).data,
			},
			status=status.HTTP_201_CREATED,
		)


class GroupListView(APIView):
	permission_classes = [IsAuthenticated]
	renderer_classes = [GroupRenderer]

	def get(self, request):
		groups = Groups.objects.filter(members__user=request.user)
		paginator = GroupPagination()
		page = paginator.paginate_queryset(groups, request)
		serializer = GroupListSerializer(page, many=True)
		return paginator.get_paginated_response(serializer.data)


class GroupView(APIView):
	permission_classes = [IsAuthenticated]
	renderer_classes = [GroupRenderer]

	def get(self, request, pk):
		group = get_object_or_404(
			Groups.objects.filter(members__user=request.user), pk=pk
		)
		serializer = ViewGroupSerializer(group, context={'request': request})
		return Response(serializer.data, status=status.HTTP_200_OK)
