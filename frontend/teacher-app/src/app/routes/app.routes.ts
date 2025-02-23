import { Routes, RouterModule} from '@angular/router';
import { AdminComponent } from '../pages/admin/admin.component';
import { authGuard } from '../guards/auth.guard';
import { LogpgComponent } from '../pages/logpg/logpg.component';
import { RegisterComponent } from '../pages/register/register.component';
export const routes: Routes = [  
    { path: 'admin', component: AdminComponent, canActivate:[authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path:'login', component:LogpgComponent},
    {path:'register', component: RegisterComponent}
  ];