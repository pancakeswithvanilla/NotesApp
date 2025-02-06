import { Component, EventEmitter,Output} from '@angular/core';
import { TeacherService } from '../teacher.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-teacher',
  imports: [FormsModule],
  templateUrl: './create-teacher.component.html',
  styleUrl: './create-teacher.component.css',
  standalone:true,
})
export class CreateTeacherComponent {
  name: string ='';
  age:number | null = null;
  @Output() teacherCreated = new EventEmitter <void>();
constructor(private teacherService: TeacherService){

}
addTeacher():void{
  if(this.age &&  this.name){
    this.teacherService.createTeacher({name:this.name, age:this.age}).subscribe(()=>{
      this.teacherCreated.emit();
      this.name = ''
      this.age = null;

    })
  }

}

}
