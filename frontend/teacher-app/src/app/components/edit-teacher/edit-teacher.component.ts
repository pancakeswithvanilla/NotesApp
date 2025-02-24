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
imageFile:File|null =null;
ngOnInit() {
  this.teacher.selectedSubjects = [...this.teacher.subjects]; 
}
saveChanges() {

  const teacherData = {
    id: this.teacher.id, 
    name: this.teacher.name,
    age: this.teacher.age,
    subjects: this.teacher.selectedSubjects,
    numHours: this.teacher.numHours ,
    
  };
  if (this.imageFile) {
    this.convertImageToBase64(this.imageFile).then((base64Image) => {
      Object.defineProperty(teacherData, "image", base64Image)
      this.saveTeacher.emit(teacherData);
      
    }).catch((error) => {
      console.error('Error converting image to Base64', error);
    });
  } else {

    this.saveTeacher.emit(teacherData);
  }
}
onFileSelected(event:any){
  this.imageFile=event.target.files[0];
}
convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); 
    reader.onerror = reject; 
    reader.readAsDataURL(file); 
  });
}

}
