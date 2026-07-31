from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from groups.models import Groups

from .models import Settlement
from .permissions import IsGroupMember
from .renderers import SettlementRenderer
from .serializers import CreateSettlementSerializer, ListSettlementSerializer
from .services import group_balance


# Create your views here.
class CreateSettlementView(APIView):
	permission_classes = [IsAuthenticated, IsGroupMember]
	renderer_classes = [SettlementRenderer]

	def post(self, request):
		serializer = CreateSettlementSerializer(
			data=request.data, context={'request': request}
		)
		serializer.is_valid(raise_exception=True)
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
