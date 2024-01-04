import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { BorrowedComponent } from './components/borrowed/borrowed.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';


@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    NavbarComponent,
    UserhomeComponent,
    BorrowedComponent,
    UserprofileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
