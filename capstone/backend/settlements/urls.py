from django.urls import path

from .views import CreateSettlementView, GetBalanceView, ListSettlementView

urlpatterns = [
	path('create/', CreateSettlementView.as_view(), name='create'),
	path('list/<int:pk>/', ListSettlementView.as_view(), name='list'),
	path('balance/<int:pk>/', GetBalanceView.as_view(), name='balance'),
]
