import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { registerError, user } from 'src/app/models/user';
import { UserService } from 'src/app/modules/user/service/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {
  userid!:string
  useris!:any
  error: registerError = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    
  };

  constructor(private routes: ActivatedRoute,private roter:Router, private userService:UserService ,private store: Store){}
ngOnInit(): void {
  
    this.routes.paramMap.subscribe((param) => {
      this.userid = param.get('userid')!; 
    });
    
  this.getUserById()
}
getUserById(){
  if(this.userid){
    this.userService.getUserById(this.userid).subscribe(data =>{ 
      this.useris = data[0]
      console.log(this.useris,'user')
      if(this.useris){}
      this.updateUserForm.patchValue({
        firstname: this.useris?.firstname,
        lastname: this.useris?.lastname,
        email: this.useris?.email,
        phone: this.useris?.phone, 
      });
    })
  }
}


  updateUserForm = new FormGroup({
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
   
  });


  submitupdateUserForm(){

    let firstname = this.updateUserForm.value.firstname!;
    let lastname = this.updateUserForm.value.lastname!;
    let email = this.updateUserForm.value.email!;
    let phone = this.updateUserForm.value.phone!;
    
    
    const formData: user = {firstname,lastname,email,phone};
    this.userService.updateUser(formData, this.userid).subscribe(data => {
      if(data){ this.roter.navigate(['admin/users'])}
    })
   
     
  }

  registorErrors() {
    //fullname error
    if (
      this.updateUserForm.controls.firstname.touched &&
      this.updateUserForm.controls.firstname.invalid
    ) {
      if (this.updateUserForm.controls.firstname.getError('required'))
        this.error.firstname = ' your name is required';
      else if (this.updateUserForm.controls.firstname.getError('maxlength'))
        this.error.firstname = 'maximum length is 20 characters';
      else if (this.updateUserForm.controls.firstname.getError('minlength'))
        this.error.firstname = 'min 3 letter required';
    } else this.error.firstname = '';
    //lastname error
    if (
      this.updateUserForm.controls.lastname.touched &&
      this.updateUserForm.controls.lastname.invalid
    ) {
      if (this.updateUserForm.controls.lastname.getError('required'))
        this.error.lastname = ' your name is required';
      else if (this.updateUserForm.controls.lastname.getError('maxlength'))
        this.error.lastname = 'maximum length is 20 characters';
      else if (this.updateUserForm.controls.lastname.getError('minlength'))
        this.error.lastname = 'min 3 letter required';
    } else this.error.lastname = '';

    // email error
    if (
      this.updateUserForm.controls.email.touched &&
      this.updateUserForm.controls.email.invalid
    ) {
      if (this.updateUserForm.controls.email.getError('required'))
        this.error.email = ' E mail is required';
      else if (this.updateUserForm.controls.email.getError('email'))
        this.error.email = ' please enter a valid email';
    } else this.error.email = '';

    // phone error
    if (
      this.updateUserForm.controls.phone.touched &&
      this.updateUserForm.controls.phone.invalid
    ) {
      if (this.updateUserForm.controls.phone.getError('required'))
        this.error.phone = 'phone number is required';
      else if (this.updateUserForm.controls.phone.getError('maxlength'))
        this.error.phone = 'maximum 10 numbers required';
      else if (this.updateUserForm.controls.phone.getError('minlength'))
        this.error.phone = 'minimum 10 mumbers required';
      else if (this.updateUserForm.controls.phone.getError('pattern'))
        this.error.phone = 'phone should be  mumbers';
    } else this.error.phone = ' ';
   
  }
}
