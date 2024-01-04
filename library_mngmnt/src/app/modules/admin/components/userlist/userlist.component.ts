import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/modules/user/service/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{
  alluser!:user[]
  constructor(private userService:UserService){}
ngOnInit(): void {
  this.allusers()
}
allusers(){
  this.userService.allUser().subscribe(data => this.alluser = data )
}
}
