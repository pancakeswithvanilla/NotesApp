import { Routes, RouterModule} from '@angular/router';
import { TeachersComponent } from '../pages/teachers/teachers.component';
import { authGuard } from '../guards/auth.guard';
import { LogpgComponent } from '../pages/logpg/logpg.component';
import { RegisterComponent } from '../pages/register/register.component';
export const routes: Routes = [  
    { path: 'teachers', component: TeachersComponent, canActivate:[authGuard] },
    { path: '', redirectTo: '/teachers', pathMatch: 'full' },
    { path:'login', component:LogpgComponent},
    {path:'register', component: RegisterComponent}
  ];