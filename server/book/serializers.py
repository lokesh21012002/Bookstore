from rest_framework import serializers
from account.models import Seller, User
from .models import Book, Invoice

class SerializeSeller(serializers.ModelSerializer):
  class Meta:
    model = Seller
    fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    seller = serializers.SerializerMethodField('get_user')
    class Meta:
        model = Book
        fields = '__all__'
    def get_user(self, obj):
        return SerializeSeller(obj.seller).data


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ['order', 'receiptnumber', 'amountpaid']
