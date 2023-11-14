from django.contrib import admin
from .models import Book

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'author', 'price', 'totalsold', 'totalavailable', 'genre', 'created_at', 'updated_at')