from django.urls import path
from .views import teacher_list, create_teacher,delete_teacher, edit_teacher, register_user,create_subject,subject_list,delete_subject

urlpatterns = [
    path('teachers/', teacher_list, name = "teacher-list"),
    path('teachers/subjects/', subject_list, name = "subject_list"),
    path('teachers/create/', create_teacher, name = "create_teacher"),
    path('teachers/createsubject/', create_subject, name = "create_subject"),
    path('teachers/deletesubject/',delete_subject,name="delete_subject" ),
    path('teachers/delete/<int:teacher_id>/', delete_teacher, name = "delete_teacher"),
    path('teachers/edit/<int:teacher_id>/', edit_teacher, name = "edit_teacher" ),
    path('register/', register_user, name ="register")
]