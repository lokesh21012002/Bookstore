from rest_framework.response import Response
from rest_framework import status
from .serializers import BookSerializer
from rest_framework.views import APIView

class Book(APIView):
    def post(self, request):
        serialize = BookSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response({'status': 'ok', 'message' : 'Book created successfully', 'data' : serialize.data}, status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
