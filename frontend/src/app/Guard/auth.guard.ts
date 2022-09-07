import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router) { }
  canActivate(){
    if(!this.auth.loggedIn()){
      this.auth.logout()
      console.log('please log in');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
