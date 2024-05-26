from django.urls import path, include
from rest_framework import routers
from .views import RoomViewSet

router = routers.DefaultRouter()
router.register('home', RoomViewSet)


urlpatterns = [
    path('', include( router.urls))
]
