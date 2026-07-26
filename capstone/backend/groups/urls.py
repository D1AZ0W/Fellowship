from django.urls import path

from .views import (
	CreateGroupView,
	DeleteGroupView,
	EditGroupView,
	GroupListView,
	GroupView,
	InviteGroupView,
	KickMemberView,
	MakeOwnerView,
)

urlpatterns = [
	path('', GroupListView.as_view()),
	path('create/', CreateGroupView.as_view(), name='create'),
	path('<int:pk>/', GroupView.as_view(), name='view'),
	path('<int:pk>/edit/', EditGroupView.as_view(), name='edit'),
	path('<int:pk>/invite/', InviteGroupView.as_view(), name='invite'),
	path('<int:pk>/delete/', DeleteGroupView.as_view(), name='delete'),
	path('<int:pk>/kick/', KickMemberView.as_view(), name='delete'),
	path('<int:pk>/owner_transfer/', MakeOwnerView.as_view(), name='delete'),
]
