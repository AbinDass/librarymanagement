import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrlAdmin = 'http://localhost:8000/admin'
  baseUrl = 'http://localhost:8000/api'
  constructor(private http:HttpClient) { }

  allUser(): Observable< user[] > {
    return this.http.get< user[] >(this.baseUrlAdmin+ `/allusers`);
  }

  getUserById(userid: string){
    return this.http.get<any>(this.baseUrlAdmin+`/singleuser?userid=${userid}`);
  }

  updateUser(userData:user, userid:string,): Observable<user>{
    return this.http.post<user>(this.baseUrlAdmin+ `/updateuser?userid=${userid}`,userData)
   }
}
