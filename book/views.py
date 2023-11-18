from django.http import QueryDict
from rest_framework.response import Response
from rest_framework import status
from account.models import Seller
from account.serializers import SellerSerializer
from .serializers import BookSerializer
from rest_framework.views import APIView
from .models import Book
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.parsers import MultiPartParser, FormParser

class IsAuthenticatedOrReadOnly(IsAuthenticated):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        return super().has_permission(request, view)

class BookView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def post(self, request):
        user = request.user
        seller = Seller.objects.get(user=user)
        if user.role == 'Buyer':
            return Response({'status': 'error', 'message' : 'Buyer cannot create book'}, status=status.HTTP_400_BAD_REQUEST)
        jsondata = request.data
        jsondata['seller'] = seller.pk
        serialize = BookSerializer(data=jsondata)
        if serialize.is_valid():
            serialize.save()
            return Response({'status': 'ok', 'message' : 'Book created successfully', 'data' : serialize.data}, status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        user = request.user
        if user.role == 'Buyer':
            return Response({'status': 'error', 'message' : 'Buyer cannot update book'}, status=status.HTTP_400_BAD_REQUEST)
        book = Book.objects.get(pk=pk)
        serialize = BookSerializer(book, data=request.data, partial=True)
        if serialize.is_valid():
            serialize.save()
            return Response({'status': 'ok', 'message' : 'Book updated successfully', 'data' : serialize.data}, status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        user = request.user
        if user.role == 'Buyer':
            return Response({'status': 'error', 'message' : 'Buyer cannot delete book'}, status=status.HTTP_400_BAD_REQUEST)
        book = Book.objects.get(pk=pk)
        book.delete()
        return Response({'status': 'ok', 'message' : 'Book deleted successfully'}, status=status.HTTP_200_OK)
    
    def get(self, request, pk=None):
        query_params = request.query_params

        title = query_params.get('title', '').strip()
        author = query_params.get('author', '').strip()
        genre = query_params.get('genre', '').strip()

        filter_conditions = Q()

        if title:
            filter_conditions &= Q(title__icontains=title)

        if author:
            filter_conditions &= (Q(author__icontains=author))

        if genre:
            filter_conditions &= Q(genre__icontains=genre)

        if pk:
            book = Book.objects.get(pk=pk)
            serializer = BookSerializer(book)
            return Response({'status': 'ok', 'message': 'Book fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            books = Book.objects.filter(filter_conditions)
            serializer = BookSerializer(books, many=True)
            return Response({'status': 'ok', 'message': 'Books fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)   
    
class BookSeller(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        user = request.user
        if user.role == 'Buyer':
            return Response({'status': 'error', 'message' : 'Buyer cannot fetch books'}, status=status.HTTP_400_BAD_REQUEST)
        seller = Seller.objects.get(user=user)
        sellerserializer = SellerSerializer(seller)
        books = Book.objects.filter(seller=seller)
        serializer = BookSerializer(books, many=True)
        data = {'data' : {
            'books' : serializer.data,
            'seller' : sellerserializer.data
        }}
        return Response({'status': 'ok', 'message': 'Books fetched successfully', 'data': data}, status=status.HTTP_200_OK)
    