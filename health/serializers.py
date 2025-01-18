from rest_framework import serializers
from .models import NailData

class NailDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = NailData
        fields = '__all__'
