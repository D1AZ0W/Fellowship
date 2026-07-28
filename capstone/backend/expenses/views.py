from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from groups.models import Groups

from .models import Expense
from .pagination import GroupPagination
from .renderers import ExpenseRenderer
from .serializers import CreateExpenseSerializer, GroupExpenseSerializer


# Create your views here.
class CreateExpenseView(APIView):
	permission_classes = [IsAuthenticated]
	renderer_classes = [ExpenseRenderer]

	def post(self, request):
		serializer = CreateExpenseSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		expense = serializer.save()
		return Response(
			{
				'message': 'Expense created successfully.',
				'expense': CreateExpenseSerializer(expense).data,
			},
			status=status.HTTP_201_CREATED,
		)


class GroupExpenseView(APIView):
	permission_classes = [IsAuthenticated]
	renderer_classes = [ExpenseRenderer]

	def get(self, request, pk):
		"""
		SELECT *
		FROM groups
		JOIN group_members ...
		WHERE
		    groups.id = <pk>
		    AND group_members.user_id = <request.user.id>
		LIMIT 1;
		"""
		group = get_object_or_404(
			Groups.objects.filter(members__user=request.user),
			pk=pk,
		)
		expenses = Expense.objects.filter(group=group)
		serializer = GroupExpenseSerializer(
			expenses,
			many=True,
		)
		return Response(serializer.data)


class UserExpenseView(APIView):
	permission_classes = [IsAuthenticated]
	renderer_classes = [ExpenseRenderer]

	def get(self, request):
		expenses = Expense.objects.filter(
			participant__user=request.user
		).distinct()
		paginator = GroupPagination()
		page = paginator.paginate_queryset(expenses, request)
		serializer = GroupExpenseSerializer(page, many=True)
		return paginator.get_paginated_response(serializer.data)
