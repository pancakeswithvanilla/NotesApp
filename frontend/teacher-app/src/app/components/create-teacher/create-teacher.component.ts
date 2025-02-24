import { Component, EventEmitter,Output,Input} from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-teacher',
  imports: [FormsModule,CommonModule],
  providers:[TeacherService],
  templateUrl: './create-teacher.component.html',
  styleUrl: './create-teacher.component.css',
  standalone:true,
})
export class CreateTeacherComponent {
  name: string ='';
  age:number | null = null;
  selectedSubjects:string[]=[];
  numHours:number=18;
  imageFile: File | null = null; 

  @Output() teacherCreated = new EventEmitter <void>();
  @Input() subjects: any[] = [];
constructor(private teacherService: TeacherService){

}
onFileSelected(event: any) {
  this.imageFile = event.target.files[0];
}
addTeacher(): void {
  if (this.age && this.name && this.selectedSubjects.length > 0 && this.numHours) {
    const selectedSubjectIds = this.subjects
      .filter(subj => this.selectedSubjects.includes(subj.subjectName)) 
      .map(subj => subj.id);
    
    let teacherData: any = {
      name: this.name,
      age: this.age,
      subjects: selectedSubjectIds,
      numHours: this.numHours,
    };

  
    if (this.imageFile) {
      this.convertImageToBase64(this.imageFile).then((base64Image) => {
        teacherData.image = base64Image;
        this.teacherService.createTeacher(teacherData).subscribe(() => {
          this.teacherCreated.emit();
          this.resetForm();
        });
      }).catch((error) => {
        console.error('Error converting image to Base64', error);
      });
    } else {

      this.teacherService.createTeacher(teacherData).subscribe(() => {
        this.teacherCreated.emit(); 
        this.resetForm();
      });
    }
  }
}

convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); 
    reader.onerror = reject; 
    reader.readAsDataURL(file); 
  });
}


resetForm() {
  this.name = '';
  this.age = null;
  this.selectedSubjects = [];
  this.numHours = 18;
  this.imageFile = null;
}

}
