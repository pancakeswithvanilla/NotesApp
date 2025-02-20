from .models import Teacher, Subject
from rest_framework import serializers
from django.contrib.auth.models import User
class TeacherSerializer(serializers.ModelSerializer):
    subjects = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(), many=True
    )
    class Meta:
        model = Teacher 
        fields = ["id", "user", "name", "age","subjects"]
        extra_kwargs = {'user': {'read_only': True}}

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ["id","subjectName", "user"]

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