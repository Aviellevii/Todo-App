import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken:any;
  user!:any;
  helper = new JwtHelperService();
  readonly api;
  constructor(private http:HttpClient) { 
    this.api = 'http://localhost:3000/users/'
  }


  login(user:any){
    return this.http.post(this.api + 'login', user);
  }
  register(user:any){
    return this.http.post(this.api + 'register', user);
  }
  storeUserData(token:any,user:any){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user
  }

  loggedIn(){
    const token = localStorage.getItem('id_token')!;
    return !this.helper.isTokenExpired(token);
  }
  getToken(){
    return localStorage.getItem('id_token')!;
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  
}
