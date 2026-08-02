from django.urls import path

from .views import GroupActivityView, UserActivityView

urlpatterns = [
	path('', UserActivityView.as_view(), name='user-activity'),
	path('<int:pk>/', GroupActivityView.as_view(), name='group-activity'),
]
