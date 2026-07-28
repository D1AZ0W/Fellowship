from django.urls import path

from .views import (
	CreateExpenseView,
	DetailExpenseView,
	GroupExpenseView,
	UserExpenseView,
)

urlpatterns = [
	path('create/', CreateExpenseView.as_view(), name='create'),
	path('group/<int:pk>/', GroupExpenseView.as_view(), name='group_expenses'),
	path('', UserExpenseView.as_view(), name='user_expenses'),
	path('<int:pk>/', DetailExpenseView.as_view(), name='detail_expense'),
]
