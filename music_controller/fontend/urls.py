from django.urls import path
from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('join/', IndexView.as_view(), name='index'),
    path('create/', IndexView.as_view(), name='index'),
    path('room/<str:roomCode>/', IndexView.as_view(), name='index'),

]