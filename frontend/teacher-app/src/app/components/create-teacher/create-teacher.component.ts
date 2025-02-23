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
  this.imageFile = event.target.files[0]; // Save the selected file
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

    // If there's an image selected, convert it to Base64 and add it to the payload
    if (this.imageFile) {
      this.convertImageToBase64(this.imageFile).then((base64Image) => {
        teacherData.image = base64Image;
        console.log("teacher data", teacherData)
        // Send the data as a normal JSON object
        this.teacherService.createTeacher(teacherData).subscribe(() => {
          this.teacherCreated.emit(); // Reset form after successful creation
          this.resetForm();
        });
      }).catch((error) => {
        console.error('Error converting image to Base64', error);
      });
    } else {
      // Send the data without image if no image is selected
      this.teacherService.createTeacher(teacherData).subscribe(() => {
        this.teacherCreated.emit(); // Reset form after successful creation
        this.resetForm();
      });
    }
  }
}

convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); // Resolve with Base64 data
    reader.onerror = reject; // Reject if there's an error reading the file
    reader.readAsDataURL(file); // Convert the image to Base64
  });
}

// Reset form after successful teacher creation
resetForm() {
  this.name = '';
  this.age = null;
  this.selectedSubjects = [];
  this.numHours = 18;
  this.imageFile = null;
}

}
