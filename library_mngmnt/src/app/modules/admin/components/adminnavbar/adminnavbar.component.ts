import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/modules/auth/authState/auth.action';

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent {
  isMobileNavActive: boolean = false;
  constructor(private store:Store, private router:Router){}
  toggleMobileNav() {
    this.isMobileNavActive = !this.isMobileNavActive;
  }

  logOut(){
    localStorage.removeItem('userid')
    localStorage.removeItem('userrole')
    localStorage.removeItem('token')
    this.store.dispatch(logout());
    this.router.navigate(['']);
  }
}
