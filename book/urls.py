from django.urls import path
from . import views

urlpatterns = [
    path('bookapi/', views.BookView.as_view()),
    path('bookapi/<int:pk>', views.BookView.as_view())
]