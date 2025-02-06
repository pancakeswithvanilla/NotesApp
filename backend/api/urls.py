from django.urls import path
from .views import teacher_list, create_teacher,delete_teacher, edit_teacher

urlpatterns = [
    path('teachers/', teacher_list, name = "teacher-list"),
    path('teachers/create/', create_teacher, name = "create_teacher"),
    path('teachers/delete/<int:teacher_id>/', delete_teacher, name = "delete_teacher"),
    path('teachers/edit/<int:teacher_id>/', edit_teacher, name = "edit_teacher" )
    
]