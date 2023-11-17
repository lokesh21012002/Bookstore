from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework import serializers
from account.models import User, Buyer, Seller, Order
from book.models import Book
from book.serializers import BookSerializer

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
  user = UserRegistrationSerializer(read_only=True, required=False)
  class Meta:
    model = Buyer
    fields = ['user','city','state','country','landmark']

class SellerSerializer(serializers.ModelSerializer):
  user = UserRegistrationSerializer(read_only=True, required=False)
  class Meta:
    model = Seller
    fields = ['user','storename','totalproductsold']
  
class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = User
    fields = ['email', 'password']

class OrderSerializer(serializers.ModelSerializer):
  buyer = BuyerSerializer(required=False)
  seller = SellerSerializer(required=False)
  book = BookSerializer(required=False)
  class Meta:
    model = Order
    fields = ['buyer', 'seller', 'book', 'address','quantity', 'totalamount']
  def create(self, validated_data):
        # Extract the nested serializer data
        buyer_data = validated_data.pop('buyer', {})
        seller_data = validated_data.pop('seller', {})
        book_data = validated_data.pop('book', {})

        # Ensure book data is present
        if not book_data:
            raise serializers.ValidationError("Book data is required.")

        # Create or update Buyer instance
        buyer_instance, _ = Buyer.objects.update_or_create(defaults=buyer_data, **buyer_data)

        # Create or update Seller instance
        seller_instance, _ = Seller.objects.update_or_create(defaults=seller_data, **seller_data)

        # Create or update Book instance
        book_instance, _ = Book.objects.update_or_create(defaults=book_data, **book_data)

        # Create Order instance with related fields
        order = Order.objects.create(
            buyer=buyer_instance,
            seller=seller_instance,
            book=book_instance,
            **validated_data
        )

        return order