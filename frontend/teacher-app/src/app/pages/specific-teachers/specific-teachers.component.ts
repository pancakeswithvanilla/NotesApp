import { Component } from '@angular/core';
import { TeacherDetailsComponent } from '../../components/teacher-details/teacher-details.component';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-specific-teachers',
  imports: [TeacherDetailsComponent,CommonModule],
  templateUrl: './specific-teachers.component.html',
  styleUrl: './specific-teachers.component.css'
})
export class SpecificTeachersComponent {
teachers: any[] = [];
  subjects:any[]=[];
  constructor(
      private teacherService: TeacherService,
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
    loadSubjects(){
      this.teacherService.getSubjects().subscribe((data)=>{
        this.subjects = data;
        console.log("Subjects", this.subjects)
      })
    }
}
