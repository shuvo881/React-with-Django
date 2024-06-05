from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RoomSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Room

# Create your views here.

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Room.objects.all()
        code = self.request.query_params.get('code', None)
        if code is not None:
            queryset = queryset.filter(code=code)
        return queryset
    
    @action(detail=False, methods=['get'], url_path='room/(?P<code>[^/.]+)')
    def get_room_by_code(self, request, code=None):
        try:
            room = Room.objects.get(code=code)
            serializer = RoomSerializer(room)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Room.DoesNotExist:
            return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        host = self.request.session.session_key
        if Room.objects.filter(host=host).exists():
            existing_room = Room.objects.get(host=host)
            request_data = serializer.validated_data
            partial_serializer = self.get_serializer(existing_room, data=request_data, partial=True)
            partial_serializer.is_valid(raise_exception=True)
            return super().perform_update(partial_serializer)
        else:
            serializer.save(host=host)
        return super().perform_create(serializer)
