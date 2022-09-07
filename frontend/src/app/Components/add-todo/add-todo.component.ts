import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyMessageService } from 'src/app/Services/alertify-message.service';
import { ITodo } from 'src/app/model/todo.interface';
import { SharedService } from '../../Services/shared.service';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  Id!:any;
  todo!:ITodo;
  form!:FormGroup;
  edit!:boolean;
  action!:string;
  isSubmitted = false;
  constructor(private fb:FormBuilder,private shared:SharedService,private router:Router,private route:ActivatedRoute,private alertify:AlertifyMessageService) { 

  }

  ngOnInit(): void {
    
    this.route.params.subscribe((params) => {
      if(params.id){
        this.Id=params.id;
        this.shared.getOneTodo(params.id).subscribe((todo:any)=>{
          this.form = this.fb.group({
            title:[todo.title,Validators.required],
            body:[todo.body,Validators.required]
          })
          this.edit = true;
          this.action = 'Update'
        })
      }else{
        this.edit = false;
        this.action = 'Add';
        this.form = this.fb.group({
          title:['',Validators.required],
          body:['',Validators.required]
        })
      }
    })
  }

  get fc(){
    return this.form.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.edit){ 
      this.shared.UpdateTodo(this.Id,this.form.value).subscribe(()=>{
        this.alertify.success('Updated')
        this.router.navigateByUrl('/');
      }) 
    }else{
      this.shared.AddTodo(this.form.value).subscribe(() =>{
        this.alertify.success('added');
        this.router.navigateByUrl('/');
      })
    }
  }

}
