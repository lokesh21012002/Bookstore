from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer
from .models import User

class Register(APIView):
    def post(self, request):
        serialize = UserRegistrationSerializer(data=request.data)
        if serialize.is_valid(raise_exception=True):
            serialize.save()
            return Response({'status': 'ok', 'message' : 'User created successfully', 'data' : serialize.data}, status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)