import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyMessageService } from 'src/app/Services/alertify-message.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

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
    if(!this.form.valid){
      this.alertify.error('please enter true value or create new acount');
      return;
    }
    this.isSubmitted = true;
    this.auth.register(this.form.value).subscribe((data:any) =>
    {
      if(data){
        this.alertify.success('register Success');
        this.router.navigate(['/login']);
      }else{
        this.alertify.error('please enter true value or create new acount')
        this.router.navigate(['/register']);
        this.form.reset();
      }     
    })
  }

}
