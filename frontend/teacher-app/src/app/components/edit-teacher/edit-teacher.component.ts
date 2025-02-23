import { CommonModule } from '@angular/common';
import { Component , Input, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-teacher',
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-teacher.component.html',
  styleUrl: './edit-teacher.component.css'
})
export class EditTeacherComponent {
@Input() teacher:any ={};
@Input() subjects:any[] = []
@Output() closeEditor = new EventEmitter <void>();
@Output() saveTeacher = new EventEmitter <any>();

ngOnInit() {
  this.teacher.selectedSubjects = [...this.teacher.subjects]; 
}
saveChanges() {

  const teacherData = {
    id: this.teacher.id, 
    name: this.teacher.name,
    age: this.teacher.age,
    subjects: this.teacher.selectedSubjects,
    numHours: this.teacher.numHours  
  };

  this.saveTeacher.emit(teacherData);
}

}
