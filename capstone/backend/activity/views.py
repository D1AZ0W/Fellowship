from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from groups.models import Groups
from settlements.permissions import IsGroupMember

from .models import Activity
from .serializers import ActivitySerializer


# Create your views here.
class GroupActivityView(APIView):
	permission_classes = [IsAuthenticated, IsGroupMember]

	def get(self, request, pk):
		group = get_object_or_404(Groups, pk=pk)
		activities = Activity.objects.filter(group=group)
		serializer = ActivitySerializer(activities, many=True)
		return Response(serializer.data)


class UserActivityView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		activities = Activity.objects.filter(group__members__user=request.user)
		serializer = ActivitySerializer(activities, many=True)
		return Response(serializer.data)
