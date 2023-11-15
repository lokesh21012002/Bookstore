from rest_framework import serializers
from account.serializers import SellerSerializer
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    seller = SellerSerializer(read_only=True, required=False)
    class Meta:
        model = Book
        fields = '__all__'