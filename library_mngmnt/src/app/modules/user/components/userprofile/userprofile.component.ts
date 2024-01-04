import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
useris!:any
userid!:string
ngOnInit(): void {
  this.userid = localStorage.getItem('userid')!
  this.userService.getUserById(this.userid).subscribe(data =>{ 
    this.useris = data[0]})
}
constructor(private userService:UserService){}

}
