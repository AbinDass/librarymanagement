import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminlandingComponent } from './components/adminlanding/adminlanding.component';
import { AdminprofileComponent } from './components/adminprofile/adminprofile.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionComponent } from './components/transaction/transaction.component';
import { AlltransactionComponent } from './components/alltransaction/alltransaction.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminlandingComponent,
    AdminprofileComponent,
    AdminnavbarComponent,
    UserlistComponent,
    EdituserComponent,
    TransactionComponent,
    AlltransactionComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, FormsModule],
})
export class AdminModule {}
