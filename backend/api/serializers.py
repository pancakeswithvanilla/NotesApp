from .models import Teacher
from rest_framework import serializers
from django.contrib.auth.models import User
class TeacherSerializer(serializers.ModelSerializer):
    model = Teacher
    fields = ["id","user", "name", "age"]
    extra_kwargs = {'user':{'read_only':True}}

class UserSerializer(serializers.ModelSerializer):
    model = User
    fields = ["id", "username", "password"]
    extra_kwargs = {'password':{'write_only':True}}

    def create(self,validated_data):
        user= user.objects.create_user(**validated_data)
        return user
