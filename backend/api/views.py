from django.shortcuts import render,redirect
from .models import Teacher
from .models import Subject
from .forms import TeacherForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import TeacherSerializer, UserSerializer, SubjectSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def teacher_list(request):
    teachers = Teacher.objects.filter(user = request.user)
    serializer = TeacherSerializer(teachers, many = True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def subject_list(request):
    subjects = Subject.objects.filter(user = request.user)
    serializer = SubjectSerializer(subjects, many = True)
    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_teacher(request):
    data = request.data.copy()  
    data['user'] = request.user.id  

    serializer = TeacherSerializer(data=data)
    if serializer.is_valid():
        teacher = serializer.save(user=request.user) 
        teacher.subjects.set(data.get('subjects', []))
        return Response(TeacherSerializer(teacher).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_subject(request):
    data = request.data.copy()
    data['user']=request.user.id
    serializer = SubjectSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user = request.user)
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_teacher(request, teacher_id):
    teacher = get_object_or_404(Teacher, id=teacher_id, user=request.user)
    teacher.delete()
    return Response({'status': 'Teacher deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def edit_teacher(request, teacher_id):
    """Edit a teacher only if it belongs to the logged-in user."""
    teacher = get_object_or_404(Teacher, id=teacher_id, user=request.user)
    
    serializer = TeacherSerializer(teacher, data=request.data, partial=True)  # Allows partial updates
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)