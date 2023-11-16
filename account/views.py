from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from book.serializers import BookSerializer
from .serializers import OrderSerializer, UserRegistrationSerializer, UserLoginSerializer, BuyerSerializer, SellerSerializer
from .models import Order, User, Buyer, Seller, Book
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

        userdata = request.data['userdata']
        roledata = request.data['roledata']
        buyer = True if userdata['role'] == 'Buyer' else False

        userserialize = UserRegistrationSerializer(data=userdata)
        roleserializer = None

        if userserialize.is_valid(raise_exception=True):

            if buyer:
                roleserializer = BuyerSerializer(data=roledata)
            else:
                roleserializer = SellerSerializer(data=roledata)

            if roleserializer.is_valid(raise_exception=True):
                user = userserialize.save()
                roleserializer.validated_data['user'] = user
                roleserializer.save()
                token = getToken(user)
                return Response({'token' : token, 'status': 'ok', 'message' : 'User created successfully', 'userdata' : userserialize.data, 'roledata' : roleserializer.data}, status=status.HTTP_200_OK)
        
        return Response(userserialize.errors, status=status.HTTP_401_UNAUTHORIZED)
    
class Login(APIView):
    def post(self, request):
        serialize = UserLoginSerializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        email = serialize.data.get('email')
        password = serialize.data.get('password')
        user = authenticate(email=email, password=password)
        if user:
            token = getToken(user)
            return Response({'token' : token, 'status': 'ok', 'message' : 'User logged in successfully', 'data' : serialize.data}, status=status.HTTP_200_OK)
        return Response({'status': 'error', 'message' : 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
class Profile(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        if user.role == 'Buyer':
            print(user)
            buyer = Buyer.objects.get(user=user)
            serializer = BuyerSerializer(buyer)
            return Response({'status': 'ok', 'message' : 'User profile fetched successfully', 'data' : serializer.data}, status=status.HTTP_200_OK)
        else:
            seller = Seller.objects.get(user=user)
            serializer = SellerSerializer(seller)
            return Response({'status': 'ok', 'message' : 'User profile fetched successfully', 'data' : serializer.data}, status=status.HTTP_200_OK)
        
class UpdateUserViaRole(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        user = request.user
        if user.role == 'Buyer':
            buyer = Buyer.objects.get(user=user)
            serializer = BuyerSerializer(buyer, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'ok', 'message' : 'User updated successfully', 'data' : serializer.data}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            seller = Seller.objects.get(user=user)
            serializer = SellerSerializer(seller, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'ok', 'message' : 'User updated successfully', 'data' : serializer.data}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUser(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        user = request.user
        if user.role == 'Buyer':
            buyer = Buyer.objects.get(user=user)
            buyerSerializer = BuyerSerializer(buyer, data=request.data['roledata'], partial=True)
            userSerializer = UserRegistrationSerializer(user, data=request.data['userdata'], partial=True)
            if buyerSerializer.is_valid() and userSerializer.is_valid():
                userSerializer.save()
                buyerSerializer.save()
                return Response({'status': 'ok', 'message' : 'User updated successfully', 'data' : userSerializer.data}, status=status.HTTP_200_OK)
            return Response(buyerSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            seller = Seller.objects.get(user=user)
            sellerSerializer = SellerSerializer(seller, data=request.data['roledata'], partial=True)
            userSerializer = UserRegistrationSerializer(user, data=request.data['userdata'], partial=True)
            if sellerSerializer.is_valid() and userSerializer.is_valid():
                userSerializer.save()
                sellerSerializer.save()
                return Response({'status': 'ok', 'message' : 'User updated successfully', 'data' : userSerializer.data}, status=status.HTTP_200_OK)
            return Response(sellerSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class DeleteUser(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        user = request.user
        user.delete()
        return Response({'status': 'ok', 'message' : 'User deleted successfully'}, status=status.HTTP_200_OK)
    
class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = request.user
        buyer = Buyer.objects.get(user=user)
        orders = Order.objects.filter(buyer=buyer)
        serializer = OrderSerializer(orders, many=True)
        return Response({'status': 'ok', 'message' : 'Orders fetched successfully', 'data' : serializer.data}, status=status.HTTP_200_OK)
        

    def post(self, request):
        user = request.user
        jsondata = request.data

        sellerid = jsondata['seller']
        bookid = jsondata['book']

        if user.role == 'Seller':
            return Response({'status': 'error', 'message' : 'Seller cannot place order'}, status=status.HTTP_400_BAD_REQUEST)
        
        buyer = Buyer.objects.get(user=user)
        book = Book.objects.get(pk=bookid)
        seller = Seller.objects.get(pk=sellerid)

        jsondata['buyer'] = BuyerSerializer(buyer).data
        jsondata['seller'] = SellerSerializer(seller).data
        jsondata['book'] = BookSerializer(book).data
        jsondata['totalamount'] = book.price * jsondata['quantity']

        serializer = OrderSerializer(data=jsondata)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'ok', 'message' : 'Order placed successfully', 'data' : serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)