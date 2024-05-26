
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('fontend.urls')),
    path('api', include('api.urls')),
]
