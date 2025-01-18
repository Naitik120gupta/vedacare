from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import NailData
from .serializers import NailDataSerializer

class ReceiveDataAPIView(APIView):
    def post(self, request):
        serializer = NailDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Data stored successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendDataAPIView(APIView):
    def get(self, request):
        data = NailData.objects.all()
        serializer = NailDataSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
