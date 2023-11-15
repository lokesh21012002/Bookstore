from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.Book.as_view(), name='create'),
    path('fetch/', views.Book.as_view(), name='fetch'),
    path('fetch/<str:pk>/', views.Book.as_view(), name='fetch'),
]