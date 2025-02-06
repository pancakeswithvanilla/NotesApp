import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrl: './teachers-list.component.css',
  imports:[CommonModule]
})
export class TeachersListComponent {
  @Input() teachers: any[] = [];
  @Output() editTeacher = new EventEmitter<any>();
  @Output() deleteTeacher = new EventEmitter<number>();

  onEdit(teacher: any) {
    this.editTeacher.emit(teacher);
  }

  onDelete(teacherId: number) {
    this.deleteTeacher.emit(teacherId);
  }
}