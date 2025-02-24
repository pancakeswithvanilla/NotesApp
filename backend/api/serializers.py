from .models import Teacher, Subject, SchoolTimetable
from rest_framework import serializers
from django.contrib.auth.models import User
from django.conf import settings

class TeacherSerializer(serializers.ModelSerializer):
    subjects = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(), many=True
    )
    class Meta:
        model = Teacher 
        fields = ["id", "user", "name", "age","subjects", "numHours", "image"]
        extra_kwargs = {'user': {'read_only': True}}
    def get_image(self, obj):
        if obj.image:
            return settings.MEDIA_URL + str(obj.image) 
        return None

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ["id","subjectName", "user"]

class SchoolTimetableSerializer(serializers.ModelSerializer):
    class Meta:
        model= SchoolTimetable
        fields = ["id", "user", "start_time", "end_time", "class_duration", "class_break", "lunch_break"]

class UserSerializer(serializers.ModelSerializer):
    confpassword = serializers.CharField(write_only=True)
    class Meta:
        model = User  
        fields = ["id", "username", "password", "confpassword"]
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data["confpassword"] != data["password"]:
            raise serializers.ValidationError({"Passwords do not match"})
        return data

    def create(self, validated_data):
        validated_data.pop("confpassword")
        user = User.objects.create_user(**validated_data)  
        return user