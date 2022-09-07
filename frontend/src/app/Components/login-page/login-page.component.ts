import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyMessageService } from 'src/app/Services/alertify-message.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!:FormGroup;
  isSubmitted = false;
  constructor(private router:Router,private fb:FormBuilder, private auth:AuthService,private alertify:AlertifyMessageService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  get fc(){
     return this.form.controls;
  }
  submit(){
    this.isSubmitted = true;
    this.auth.login(this.form.value).subscribe((data:any) =>
    {
          this.auth.storeUserData(data.token,data.user);
          this.alertify.success('you logged in')
          this.router.navigate(['/']);

    },(err)=>{
      this.alertify.error('please enter true value or create new acount')
      this.router.navigate(['/login']);
      this.form.reset();
    })
  }

}
