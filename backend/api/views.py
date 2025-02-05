from django.shortcuts import render,redirect
from .models import Teacher
from .forms import TeacherForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

def teacher_list(request):
    teachers = Teacher.objects.all().values()
    return JsonResponse(list(teachers), safe = False)

@csrf_exempt
@api_view(['POST'])
def create_teacher(request):
    form = TeacherForm(request.data)
    if form.is_valid():
        teacher = form.save()
        return Response({'status': 'Teacher created successfully'}, status=201)
    else:
        return Response(form.errors, status=400)
    
@api_view(['DELETE'])
def delete_teacher(request, teacher_id):
    try:
        teacher = Teacher.objects.get(id = teacher_id)
        teacher.delete()
        return Response({'status': 'Teacher deleted successfully'})
    except Teacher.DoesNotExist:
        return(Response({'status':'Teacher not found'}))