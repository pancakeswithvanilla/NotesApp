import { Component,OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { CommonModule } from '@angular/common';
import { CreateTeacherComponent } from '../create-teacher/create-teacher.component';
@Component({
  selector: 'app-teachers',
  imports: [CommonModule, CreateTeacherComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {
  teachers:any[]=[];
  constructor(private teacherService: TeacherService){ //why private?

  }
  ngOnInit():void{
   this.loadTeachers();
  }
  loadTeachers(){
    this.teacherService.getTeachers().subscribe(data =>{
      this.teachers = data;
    });
  }
  deleteTeacher(teacherId:number){
    this.teacherService.deleteTeacher(teacherId).subscribe(()=>{
      this.teachers = this.teachers.filter(teacher =>teacher.id !== teacherId)
    },
    (error) =>{
      console.log("Error deleting teacher")
    }
  )
  }
  onTeacherCreated(){
    this.loadTeachers();
  }
  
}
