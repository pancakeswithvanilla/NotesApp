import { Component,OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { CreateTeacherComponent } from '../../components/create-teacher/create-teacher.component';
import { EditTeacherComponent } from '../../components/edit-teacher/edit-teacher.component';
import { TeachersListComponent } from '../../components/teachers-list/teachers-list.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-teachers',
  imports: [CommonModule, CreateTeacherComponent,EditTeacherComponent, TeachersListComponent],
  standalone:true,
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {
  teachers:any[]=[];
  editingTeacher: any = null;
  constructor(private teacherService: TeacherService, private authService:AuthService, private router:Router){ 

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
      console.log("Error deleting teacher: ", error)
    }
  )
  }

  logout(){
    console.log("Logging out")
    this.authService.logout();
    this.router.navigate(['login']);

  }

  onTeacherCreated(){
    this.loadTeachers();
  }
  
}
