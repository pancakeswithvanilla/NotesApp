import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { TeachersComponent } from '../components/teachers/teachers.component';
import { CreateTeacherComponent } from '../components/create-teacher/create-teacher.component';
export const routes: Routes = [  
    { path: 'teachers', component: TeachersComponent },
    { path: '', redirectTo: '/teachers', pathMatch: 'full' }
  ];