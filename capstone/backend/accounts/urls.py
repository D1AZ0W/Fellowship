from django.urls import path

from .views import (
	ChangePasswordView,
	EditProfileView,
	LoginView,
	LogoutView,
	PasswordResetView,
	ProfileView,
	RegisterView,
	SendPasswordResetEmailView,
)

urlpatterns = [
	path('register/', RegisterView.as_view(), name='register'),
	path('login/', LoginView.as_view(), name='login'),
	path('profile/', ProfileView.as_view(), name='profile'),
	path(
		'changepassword/', ChangePasswordView.as_view(), name='changepassword'
	),
	path('logout/', LogoutView.as_view(), name='logout'),
	path('edit/', EditProfileView.as_view(), name='edit'),
	path(
		'send-reset-password/',
		SendPasswordResetEmailView.as_view(),
		name='emailsend',
	),
	path(
		'reset-password/<id>/<token>/',
		PasswordResetView.as_view(),
		name='resetpassword',
	),
]
