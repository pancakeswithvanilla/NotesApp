from django.db import models
from django.contrib.auth.models import User

class Teacher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)
    name = models.CharField(max_length=80)
    age = models.IntegerField()
    def __str__(self):
        return self.name