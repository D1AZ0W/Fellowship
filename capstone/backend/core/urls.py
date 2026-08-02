from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
	path('admin/', admin.site.urls),
	path('api-auth/', include('accounts.urls')),
	path('groups/', include('groups.urls')),
	path('expenses/', include('expenses.urls')),
	path('settlements/', include('settlements.urls')),
	path('dashboard/', include('dashboard.urls')),
	path('activity/', include('activity.urls')),
]

if settings.DEBUG:
	urlpatterns += static(
		settings.MEDIA_URL,
		document_root=settings.MEDIA_ROOT,
	)
