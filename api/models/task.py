from django.db import models
from django.forms import CharField
# Create your models here.
class Task(models.Model):
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    email = models.EmailField()