from django.contrib import admin
from .models import User, PhoneNumber, Buyer, Seller, Orders

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id','email', 'role', 'name', 'created_at', 'updated_at')

@admin.register(PhoneNumber)
class PhoneNumberAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'phone_number', 'created_at', 'updated_at')

@admin.register(Buyer)
class BuyerAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'city', 'state', 'country', 'landmark', 'created_at', 'updated_at')

@admin.register(Seller)
class SellerAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'storename', 'productsold', 'created_at', 'updated_at')

@admin.register(Orders)
class OrdersAdmin(admin.ModelAdmin):
    list_display = ('id','buyer', 'seller', 'book', 'address', 'status', 'total', 'quantity', 'totalamount', 'created_at', 'updated_at')