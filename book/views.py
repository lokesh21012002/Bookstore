from rest_framework.response import Response
from rest_framework import status
from .serializers import BookSerializer
from rest_framework.views import APIView
from .models import Book
from django.db.models import Q

class BookView(APIView):
    def post(self, request):
        serialize = BookSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response({'status': 'ok', 'message' : 'Book created successfully', 'data' : serialize.data}, status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
    
    def put(self, request, pk):
        book = Book.objects.get(pk=pk)
        serialize = BookSerializer(book, data=request.data, partial=True)
        if serialize.is_valid():
            serialize.save()
            return Response({'status': 'ok', 'message' : 'Book updated successfully', 'data' : serialize.data}, status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        book = Book.objects.get(pk=pk)
        book.delete()
        return Response({'status': 'ok', 'message' : 'Book deleted successfully'}, status=status.HTTP_200_OK)