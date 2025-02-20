from django.db import models
from django.contrib.auth.models import User

class Subject(models.Model):
    user = models.ForeignKey(User,on_delete = models.CASCADE, default = 10 )
    subjectName = models.CharField(max_length=100, unique = True)
    def __str__(self):
        return self.name
    
class Teacher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 10)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    subjects = models.ManyToManyField(Subject, related_name = "teachers", blank=True)
    def __str__(self):
        return self.name
    
