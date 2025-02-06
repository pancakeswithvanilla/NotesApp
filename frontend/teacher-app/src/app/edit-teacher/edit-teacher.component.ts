import { Component , Input, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-teacher',
  imports: [FormsModule],
  templateUrl: './edit-teacher.component.html',
  styleUrl: './edit-teacher.component.css'
})
export class EditTeacherComponent {
@Input() teacher:any ={};
@Output() closeEditor = new EventEmitter <void>();
@Output() saveTeacher = new EventEmitter <any>();

saveChanges(){
  this.saveTeacher.emit(this.teacher);
}
}
