from rest_framework import serializers
from .models import *



class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        read_only_fields = ('created_at', 'code', 'host', )