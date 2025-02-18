import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-subject',
  imports: [FormsModule],
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.css'
})
export class CreateSubjectComponent {
  subjectName:string = ''
  @Output() subjectCreated = new EventEmitter <void>();
constructor(private teacherService: TeacherService){
}
addSubject():void{
  if(this.subjectName){
    this.teacherService.createSubject({subjectName: this.subjectName}).subscribe(()=>{
      this.subjectCreated.emit();
      this.subjectName ='';
    })
  }
}

}
