from django.db import models
from django.contrib.auth.models import User

class Subject(models.Model):
    user = models.ForeignKey(User,on_delete = models.CASCADE, default = 10 )
    subjectName = models.CharField(max_length=100, unique = True)
    def __str__(self):
        return self.subjectName
    
class Teacher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 10)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    subjects = models.ManyToManyField(Subject, related_name = "teachers", blank=True)
    numHours = models.IntegerField(default=18)
    image = models.ImageField(upload_to='teacher_images/', null=True, blank=True)
    def __str__(self):
        return self.name
    
class SchoolTimetable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 10)
    start_time = models.TimeField()
    end_time = models.TimeField()
    class_duration = models.TimeField()
    class_break = models.TimeField()
    lunch_break = models.TimeField()

    
