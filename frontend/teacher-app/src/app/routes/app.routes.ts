import { Routes, RouterModule} from '@angular/router';
import { TeachersComponent } from '../pages/teachers/teachers.component';
import { LoginComponent } from '../pages/login/login.component';
import { authGuard } from '../guards/auth.guard';
export const routes: Routes = [  
    { path: 'teachers', component: TeachersComponent, canActivate:[authGuard] },
    { path: '', redirectTo: '/teachers', pathMatch: 'full' },
    { path:'login', component:LoginComponent},
  ];