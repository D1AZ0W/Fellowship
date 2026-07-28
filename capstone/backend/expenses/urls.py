from django.urls import path

from .views import (
	CreateExpenseView,
	DeleteExpenseView,
	DetailExpenseView,
	EditExpenseView,
	GroupExpenseView,
	UserExpenseView,
)

urlpatterns = [
	path('create/', CreateExpenseView.as_view(), name='create'),
	path('group/<int:pk>/', GroupExpenseView.as_view(), name='group_expenses'),
	path('', UserExpenseView.as_view(), name='user_expenses'),
	path('<int:pk>/', DetailExpenseView.as_view(), name='detail_expense'),
	path('<int:pk>/edit/', EditExpenseView.as_view(), name='edit_expense'),
	path(
		'<int:pk>/delete/', DeleteExpenseView.as_view(), name='delete_expense'
	),
]
