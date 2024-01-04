import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appStateInterface } from 'src/app/appStore/appState';
import { registerError } from 'src/app/models/user';
import { idSelector, tokenSelector } from '../../authState/auth.selector';
import { signUpRequested } from '../../authState/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error: registerError = {
    firstname: '',
    lastname: '',
    email: '',
    phone:'',
    role: '',
    password: '',
    confirmpassword: '',
  };

  registrationForm = new FormGroup({
    firstname: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
    ]),
    lastname: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern('^[0-9]{10}$'),
    ]),
    role: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmpassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
 
  constructor(private store:Store<appStateInterface>){}

  submitRegisterForm(){

    let firstname = this.registrationForm.value.firstname!;
    let lastname = this.registrationForm.value.lastname!;
    let email = this.registrationForm.value.email!;
    let phone = this.registrationForm.value.phone!;
    let role = this.registrationForm.value.role!;
    let password = this.registrationForm.value.password!;
    let confirmpassword =  this.registrationForm.value.confirmpassword;
        this.store.dispatch(signUpRequested({ firstname, lastname, email,phone,role,password,confirmpassword}));
  }

  registorErrors() {
    //fullname error
    if (
      this.registrationForm.controls.firstname.touched &&
      this.registrationForm.controls.firstname.invalid
    ) {
      if (this.registrationForm.controls.firstname.getError('required'))
        this.error.firstname = ' your name is required';
      else if (this.registrationForm.controls.firstname.getError('maxlength'))
        this.error.firstname = 'maximum length is 20 characters';
      else if (this.registrationForm.controls.firstname.getError('minlength'))
        this.error.firstname = 'min 3 letter required';
    } else this.error.firstname = '';
    //lastname error
    if (
      this.registrationForm.controls.lastname.touched &&
      this.registrationForm.controls.lastname.invalid
    ) {
      if (this.registrationForm.controls.lastname.getError('required'))
        this.error.lastname = ' your name is required';
      else if (this.registrationForm.controls.lastname.getError('maxlength'))
        this.error.lastname = 'maximum length is 20 characters';
      else if (this.registrationForm.controls.lastname.getError('minlength'))
        this.error.lastname = 'min 3 letter required';
    } else this.error.lastname = '';

    // email error
    if (
      this.registrationForm.controls.email.touched &&
      this.registrationForm.controls.email.invalid
    ) {
      if (this.registrationForm.controls.email.getError('required'))
        this.error.email = ' E mail is required';
      else if (this.registrationForm.controls.email.getError('email'))
        this.error.email = ' please enter a valid email';
    } else this.error.email = '';

    // phone error
    if (
      this.registrationForm.controls.phone.touched &&
      this.registrationForm.controls.phone.invalid
    ) {
      if (this.registrationForm.controls.phone.getError('required'))
        this.error.phone = 'phone number is required';
      else if (this.registrationForm.controls.phone.getError('maxlength'))
        this.error.phone = 'maximum 10 numbers required';
      else if (this.registrationForm.controls.phone.getError('minlength'))
        this.error.phone = 'minimum 10 mumbers required';
      else if (this.registrationForm.controls.phone.getError('pattern'))
        this.error.phone = 'phone should be  mumbers';
    } else this.error.phone = ' ';
    //role error 
    if (
      this.registrationForm.controls.role.touched &&
      this.registrationForm.controls.role.invalid
    ) {
      if (this.registrationForm.controls.role.getError('required'))
        this.error.role = 'choose your role';
    }
    //password error
    if (
      this.registrationForm.controls.password.touched &&
      this.registrationForm.controls.password.invalid
    ) {
      if (this.registrationForm.controls.password.getError('required'))
        this.error.password = 'password required';
      else if (this.registrationForm.controls.password.getError('minlength'))
        this.error.password = ' password length should 6 ';
    } else this.error.password = ' ';

    //confirm password error
    if (
      this.registrationForm.controls.confirmpassword.touched &&
      this.registrationForm.controls.confirmpassword.invalid
    ) {
      if (this.registrationForm.controls.confirmpassword.getError('required'))
        this.error.confirmpassword = 'Confirm Password required';
      else if (this.registrationForm.controls.confirmpassword.getError('minlength'))
        this.error.confirmpassword = 'Confirm password length should 6 ';
    } else this.error.confirmpassword = ' ';
  }
}
