from django.db import models
from django.forms import CharField
# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200,default=False)
    completed = models.BooleanField(default=False, blank=True, null=True)