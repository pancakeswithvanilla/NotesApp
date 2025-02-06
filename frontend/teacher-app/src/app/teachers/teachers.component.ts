import { Component,OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { CommonModule } from '@angular/common';
import { CreateTeacherComponent } from '../create-teacher/create-teacher.component';
import { EditTeacherComponent } from '../edit-teacher/edit-teacher.component';
@Component({
  selector: 'app-teachers',
  imports: [CommonModule, CreateTeacherComponent,EditTeacherComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {
  teachers:any[]=[];
  editingTeacher: any = null;
  constructor(private teacherService: TeacherService){ 

  }
  ngOnInit():void{
   this.loadTeachers();
  }
  loadTeachers(){
    this.teacherService.getTeachers().subscribe(data =>{
      this.teachers = data;
    });
  }
  editTeacher(teacher:any){
    this.editingTeacher = {...teacher}
  }
  updateTeacher(updatedTeacher:any){
    this.teacherService.editTeacher(updatedTeacher.id, updatedTeacher).subscribe(response =>{
      this.loadTeachers();
      this.editingTeacher = null;
    }, 
  (error)=>{
    console.log('Error updating teacher:', error);
  })
  }

  closeEditor(){
    this.editingTeacher = null;
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
