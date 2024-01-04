import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/modules/auth/authState/auth.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  isMobileView = true;
  constructor(private router:Router, private store:Store){}
  toggleMenu() {
    this.isMobileView = !this.isMobileView;
  }

  logOut(){
    localStorage.removeItem('userid')
    localStorage.removeItem('userrole')
    localStorage.removeItem('token')
    this.store.dispatch(logout());
    this.router.navigate(['']);

  }
}
