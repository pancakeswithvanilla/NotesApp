import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-subject',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.css'
})
export class CreateSubjectComponent {
  subjectName:string = ''
  @Input() title:string='';
  @Output() subjectCreated = new EventEmitter <void>();
  @Output() subjectDeleted = new EventEmitter <string>();
constructor(private teacherService: TeacherService){
}
addSubject():void{
  if(this.subjectName){
    this.teacherService.createSubject({subjectName: this.subjectName}).subscribe(()=>{
      this.subjectCreated.emit(); //custom evenListener emits, triggers loadSubjects() inside teachers page
      this.subjectName ='';
    })
  }
}

deleteSubject():void{
  if(this.subjectName){
      this.subjectDeleted.emit(this.subjectName);
      this.subjectName=''
  }
}

}
