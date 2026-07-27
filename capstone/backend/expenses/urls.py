from django.urls import path

from .views import CreateExpenseView, GroupExpenseView

urlpatterns = [
	path('create/', CreateExpenseView.as_view(), name='create'),
	path('group/<int:pk>/', GroupExpenseView.as_view(), name='group_expenses'),
]
