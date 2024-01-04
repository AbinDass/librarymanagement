import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlandingComponent } from './components/adminlanding/adminlanding.component';
import { BooklistComponent } from '../book/components/booklist/booklist.component';
import { AddbookComponent } from '../book/components/addbook/addbook.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { EditbookComponent } from '../book/components/editbook/editbook.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { AlltransactionComponent } from './components/alltransaction/alltransaction.component';
import { authGuardGuard } from 'src/app/auth-guard.guard';
 
const routes: Routes = [
  {path:'admin',canActivateChild:[authGuardGuard],component:AdminlandingComponent, children:[
    {path:'',component:BooklistComponent},
    {path:'addbook',component:AddbookComponent},
    {path:'editbook/:bookid',component:EditbookComponent},
    {path:'users',component:UserlistComponent},
    {path:'edituser/:userid',component:EdituserComponent},
    {path:'transaction/:bookid',component:TransactionComponent},
    {path:'alltransaction',component:AlltransactionComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
