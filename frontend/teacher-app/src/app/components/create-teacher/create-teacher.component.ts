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
  @Output() teacherCreated = new EventEmitter <void>();
  @Input() subjects: any[] = [];
constructor(private teacherService: TeacherService){

}
addTeacher():void{
  if (this.age && this.name && this.selectedSubjects.length > 0) {
    const selectedSubjectIds = this.subjects
      .filter(subj => this.selectedSubjects.includes(subj.subjectName)) 
      .map(subj => subj.id);
    this.teacherService.createTeacher({name:this.name, age:this.age, subjects: selectedSubjectIds}).subscribe(()=>{
      this.teacherCreated.emit(); //clear input fields after successful generation of new teacher
      this.name = ''
      this.age = null;
      this.selectedSubjects = []

    })
  }

}

}
