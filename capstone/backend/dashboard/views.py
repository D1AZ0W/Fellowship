from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import (
    dashboard_category_report,
    dashboard_groups,
    dashboard_monthly,
    dashboard_summary,
    dashboard_transactions,
)

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(
            {
                'summary': dashboard_summary(request.user),
                'groups': dashboard_groups(request.user),
                'suggested_transactions': dashboard_transactions(request.user),
                'monthly_report': dashboard_monthly(request.user),
                'category_report': dashboard_category_report(request.user),
            }
        )