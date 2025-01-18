from django.urls import path
from .views import ReceiveDataAPIView, SendDataAPIView

urlpatterns = [
    path('receive-data/', ReceiveDataAPIView.as_view(), name='receive_data'),
    path('send-data/', SendDataAPIView.as_view(), name='send_data'),
]
