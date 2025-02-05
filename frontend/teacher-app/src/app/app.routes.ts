import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { TeachersComponent } from './teachers/teachers.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
export const routes: Routes = [  // Ensure `routes` is exported
    { path: 'teachers', component: TeachersComponent },
    { path: '', redirectTo: '/teachers', pathMatch: 'full' }
  ];