import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from './components/home/home.component';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { BooklistComponent } from '../book/components/booklist/booklist.component';
import { BorrowedComponent } from './components/borrowed/borrowed.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { EdituserComponent } from '../admin/components/edituser/edituser.component';
import { authGuardGuard } from 'src/app/auth-guard.guard';

const routes: Routes = [
  {path:'',component:UserComponent,children:[
    {path:'',component:HomeComponent},
    {path:'userhome',canActivateChild:[authGuardGuard],component:UserhomeComponent, children:[
      {path:'',component:BooklistComponent},
      {path:'borrow',component:BorrowedComponent},
      {path:'userprofile',component:UserprofileComponent},
      {path:'edituser/:userid',component:EdituserComponent},
    ]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
