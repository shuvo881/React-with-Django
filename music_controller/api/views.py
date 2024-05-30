from urllib import response
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RoomSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Room

# Create your views here.


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    # http_method_names = ['get', 'post']
    # permission_classes = [IsAuthenticated]  # This is a list of permissions that the user must have to access the view. If the list is empty, then the view is accessible to everyone.

    def get_queryset(self):
        queryset = Room.objects.all()
        host = self.request.query_params.get('host', None)
        if host is not None:
            queryset = queryset.filter(host=host)
        return queryset

    def perform_create(self, serializer):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        host = self.request.session.session_key
        serializer.save(host=host)
        return super().perform_create(serializer)
    
    