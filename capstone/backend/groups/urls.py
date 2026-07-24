from django.urls import path

from .views import CreateGroupView

urlpatterns = [
	path('create/', CreateGroupView.as_view(), name='create'),
]
