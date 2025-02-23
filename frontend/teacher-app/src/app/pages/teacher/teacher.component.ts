import { Component } from '@angular/core';
import { TeachersListComponent } from '../../components/teachers-list/teachers-list.component';
import { TeacherService } from '../../services/teacher.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-teacher',
  imports: [TeachersListComponent],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  teachers: any[] = [];
  subjects:any[]=[];
  editingTeacher: any = null;
  constructor(
      private teacherService: TeacherService,
      private authService: AuthService,
      private router: Router
    ) {}
    ngOnInit(): void {
      this.loadSubjects();
      this.loadTeachers();
    }
    loadTeachers() {
      this.teacherService.getTeachers().subscribe((data) => {
        this.teachers = data;
        this.teachers.forEach(teacher => {
          teacher.subjectNames = teacher.subjects.map((subjectId: number) => {
            const subject = this.subjects.find(subj => subj.id === subjectId);
            return subject ? subject.subjectName : '';  
          });
        });
      });
    }
    editTeacher(teacher: any) {
      this.editingTeacher = { ...teacher };
    }
    loadSubjects(){
      this.teacherService.getSubjects().subscribe((data)=>{
        this.subjects = data;
        console.log("Subjects", this.subjects)
      })
    }
    deleteTeacher(teacherId: number) {
      this.teacherService.deleteTeacher(teacherId).subscribe(
        () => {
          this.teachers = this.teachers.filter((teacher) => teacher.id !== teacherId);
        },
        (error) => {
          console.log('Error deleting teacher: ', error);
        }
      );
    }
}
