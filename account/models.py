from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class User(AbstractBaseUser):
    email = models.EmailField(max_length=255)
    name = models.CharField(max_length=255)

    USERNAME_FIELD = 'email'

