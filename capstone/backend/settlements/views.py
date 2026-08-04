from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import Users
from expenses.serializers import PaidBySerializer
from groups.models import Groups

from .models import Settlement
from .permissions import IsGroupMember
from .renderers import SettlementRenderer
from .serializers import CreateSettlementSerializer, ListSettlementSerializer
from .services import get_transactions, group_balance


# Create your views here.
class CreateSettlementView(APIView):
	permission_classes = [IsAuthenticated, IsGroupMember]
	renderer_classes = [SettlementRenderer]

	def post(self, request):
		serializer = CreateSettlementSerializer(
			data=request.data, context={'request': request}
		)
		serializer.is_valid(raise_excSettlementRenderereption=True)
		settlement = serializer.save()
		return Response(
			{'msg': 'Settlement created.', 'id': settlement.id},
			status=status.HTTP_201_CREATED,
		)


class ListSettlementView(APIView):
	permission_classes = [IsAuthenticated, IsGroupMember]
	renderer_classes = [SettlementRenderer]

	def get(self, request, pk):
		group = get_object_or_404(Groups, pk=pk)
		settlements = Settlement.objects.filter(group=group)
		serializer = ListSettlementSerializer(settlements, many=True)
		return Response(serializer.data)


class GetBalanceView(APIView):
	permission_classes = [IsAuthenticated, IsGroupMember]
	renderer_classes = [SettlementRenderer]

	def get(self, request, pk):
		data = group_balance(pk)
		return Response(data)


class SuggestedTransactionsView(APIView):
	permission_classes = [IsAuthenticated, IsGroupMember]
	renderer_classes = [SettlementRenderer]

	def get(self, request, pk):
		group = get_object_or_404(Groups, pk=pk)
		transactions = get_transactions(group)
		user_ids = set()
		for t in transactions:
			user_ids.add(t['payer'])
			user_ids.add(t['recipient'])
		users = Users.objects.filter(id__in=user_ids)
		user_map = {user.id: user for user in users}
		for t in transactions:
			t['payer'] = PaidBySerializer(user_map[t['payer']]).data
			t['recipient'] = PaidBySerializer(user_map[t['recipient']]).data
		return Response(transactions)
