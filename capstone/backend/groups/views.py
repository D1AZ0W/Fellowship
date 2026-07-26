from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Groups
from .pagination import GroupPagination
from .permissions import IsOwner
from .renderers import GroupRenderer
from .serializers import (
	CreateGroupSerializer,
	EditGroupSerializer,
	GroupListSerializer,
	InviteGroupSerializer,
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


class EditGroupView(APIView):
	permission_classes = [IsAuthenticated, IsOwner]
	renderer_classes = [GroupRenderer]

	def patch(self, request, pk):
		group = get_object_or_404(Groups, pk=pk)
		serializer = EditGroupSerializer(
			group, data=request.data, partial=True
		)

		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(
			{
				'message': 'Group updated successfully.',
			},
			status=status.HTTP_202_ACCEPTED,
		)


class InviteGroupView(APIView):
	permission_classes = [IsAuthenticated, IsOwner]
	renderer_classes = [GroupRenderer]

	def post(self, request, pk):
		group = get_object_or_404(Groups, pk=pk)
		serializer = InviteGroupSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save(group=group)

		return Response(
			{'message': f'{user.username} was added successfully'},
			status=status.HTTP_200_OK,
		)


class DeleteGroupView(APIView):
	permission_classes = [IsAuthenticated, IsOwner]
	renderer_classes = [GroupRenderer]

	def delete(self, request, pk):
		group = get_object_or_404(Groups, pk=pk)

		group.delete()

		return Response(
			{'message': 'Group deleted successfully.'},
			status=status.HTTP_200_OK,
		)
