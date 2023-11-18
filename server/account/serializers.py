from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework import serializers
from account.models import User, Buyer, Seller, Order
from book.models import Book
from book.serializers import BookSerializer, SerializeSeller

class UserRegistrationSerializer(serializers.ModelSerializer):
  # We are writing this becoz we need confirm password field in our Registratin Request
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  class Meta:
    model = User
    fields=['email', 'name', 'password', 'password2', 'role', 'avatar']
    extra_kwargs={
      'password':{'write_only':True}
    }

  # Validating Password and Confirm Password while Registration
  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

  def create(self, validate_data):
    return User.objects.create_user(**validate_data)

class BuyerSerializer(serializers.ModelSerializer):
  user = UserRegistrationSerializer(required=False)
  class Meta:
    model = Buyer
    fields = ['user','city','state','country','landmark']

class SellerSerializer(serializers.ModelSerializer):
  user = UserRegistrationSerializer(required=False)
  class Meta:
    model = Seller
    fields = ['user','storename','totalproductsold']
  
class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = User
    fields = ['email', 'password']

class OrderSerializer(serializers.ModelSerializer):
  seller = serializers.SerializerMethodField('get_seller')
  buyer = serializers.SerializerMethodField('get_buyer')
  book = serializers.SerializerMethodField('get_book')
  class Meta:
    model = Order
    fields = ['buyer', 'seller', 'book', 'address','quantity', 'totalamount']

  def get_seller(self, obj):
        return SerializeSeller(obj.seller).data
  
  def get_buyer(self, obj):
        return BuyerSerializer(obj.buyer).data
  
  def get_book(self, obj):
        return BookSerializer(obj.book).data