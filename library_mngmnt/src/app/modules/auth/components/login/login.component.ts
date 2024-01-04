import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appStateInterface } from 'src/app/appStore/appState';
import { loginRequested } from '../../authState/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email : new FormControl(null, [Validators.required , Validators.email]),
    password : new FormControl(null, [Validators.required , Validators.minLength(6)]),
})

emailError!:string
passwordError!:string
constructor(private store:Store<appStateInterface>){}


loginSubmit() { 
  let email = this.loginForm.value.email ?? ""
  let password = this.loginForm.value.password ?? ""
  this.store.dispatch(loginRequested({email,password}));
}

checkLoginErrors() {
  if(this.loginForm.controls.email.touched && this.loginForm.controls.email.invalid){
      if(this.loginForm.controls.email.getError('required')  ){
        this.emailError = " E mail is required"
      }else if(this.loginForm.controls.email.getError('email')  ){
        this.emailError = " please enter a valid email"
      }
  }else this.emailError = '' 

  if(this.loginForm.controls.password.touched && this.loginForm.controls.password.invalid){
    if(this.loginForm.controls.password.getError('required')){
      this.passwordError = "password required"
    }else if(this.loginForm.controls.password.getError('minlength')){
      this.passwordError = " password length should 6 "
    }
  }else this.passwordError = " "
}
}
