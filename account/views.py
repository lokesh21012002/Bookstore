from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer, UserLoginSerializer
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

def getToken(User):
    genToken = RefreshToken.for_user(User)
    return {
        'refresh': str(genToken),
        'access': str(genToken.access_token)
    }

class Register(APIView):
    def post(self, request):
        serialize = UserRegistrationSerializer(data=request.data)
        if serialize.is_valid(raise_exception=True):
            user = serialize.save()
            token = getToken(user)
            return Response({'token' : token, 'status': 'ok', 'message' : 'User created successfully', 'data' : serialize.data}, status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_401_UNAUTHORIZED)
    
class Login(APIView):
    def post(self, request):
        serialize = UserLoginSerializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        email = serialize.data.get('email')
        password = serialize.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = getToken(user)
            return Response({'token' : token, 'status': 'ok', 'message' : 'User logged in successfully', 'data' : serialize.data}, status=status.HTTP_200_OK)
        return Response({'status': 'error', 'message' : 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    