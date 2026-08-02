from rest_framework import serializers

from expenses.serializers import PaidBySerializer

from .models import Activity


class ActivitySerializer(serializers.ModelSerializer):
	done_by = PaidBySerializer(read_only=True)

	class Meta:
		model = Activity
		fields = '__all__'
