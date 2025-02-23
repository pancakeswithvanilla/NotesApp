from django.urls import path
from .views import teacher_list, create_teacher,delete_teacher, get_teacher 
from .views import edit_teacher, register_user,create_subject,subject_list,delete_subject

urlpatterns = [
    path('admin/', teacher_list, name = "teacher-list"),
    path('admin/subjects/', subject_list, name = "subject_list"),
    path('admin/create/', create_teacher, name = "create_teacher"),
    path('admin/createsubject/', create_subject, name = "create_subject"),
    path('admin/deletesubject/<int:subject_id>/',delete_subject,name="delete_subject" ),
    path('admin/delete/<int:teacher_id>/', delete_teacher, name = "delete_teacher"),
    path('admin/edit/<int:teacher_id>/', edit_teacher, name = "edit_teacher" ),
    path('admin/<int:teacher_id>/', get_teacher, name = "get_teacher" ),
    path('register/', register_user, name ="register")
]