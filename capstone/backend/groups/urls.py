from django.urls import path

from .views import CreateGroupView, GroupListView, GroupView

urlpatterns = [
	path('', GroupListView.as_view()),
	path('create/', CreateGroupView.as_view(), name='create'),
	path('<int:pk>/', GroupView.as_view(), name='view'),
]
