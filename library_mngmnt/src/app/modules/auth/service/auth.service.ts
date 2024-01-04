import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user, userData } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:string = 'http://localhost:8000/auth'
  constructor(private http:HttpClient) { }

  register(data:user){
    return this.http.post<userData>(this.baseUrl + '/register', data);
  }

  login(data:{email:string; password:string}){
    return this.http.post<userData>(this.baseUrl + `/login`, data)
  }
}
