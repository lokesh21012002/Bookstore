from rest_framework import serializers
from .models import Book, Invoice

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['seller','title', 'author', 'price', 'totalsold', 'totalavailable', 'cover', 'genre']

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ['order', 'receiptnumber', 'amountpaid']