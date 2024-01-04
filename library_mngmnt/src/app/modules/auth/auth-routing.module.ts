import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { signGuard } from 'src/app/auth-guard.guard';

const routes: Routes = [
  {path:'register',component:RegisterComponent},                                    
  {path:'login',canActivate:[signGuard],component:LoginComponent},                                    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
