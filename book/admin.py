from django.contrib import admin
from . models import Book

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'seller', 'title', 'author', 'created_at', 'updated_at')
