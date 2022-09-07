import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyMessageService } from 'src/app/Services/alertify-message.service';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name!:string;
  constructor(private auth:AuthService,private router:Router,private alertify:AlertifyMessageService) { 
    if(localStorage.getItem('user')){
      this.name = JSON.parse(localStorage.getItem('user')!).username; 
    }
  }
  

  ngOnInit(): void {
  
  }
  loggin(){
    return this.auth.loggedIn();
  }
  logOut(){
    this.auth.logout();
    this.alertify.error('You logged Out')
    this.router.navigate(['/login']);
  }

}
