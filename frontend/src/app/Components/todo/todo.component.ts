import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ITodo } from 'src/app/model/todo.interface';
import { AlertifyMessageService } from 'src/app/Services/alertify-message.service';
import { SharedService } from '../../Services/shared.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo!:ITodo;
  @Output() deleteEvent = new EventEmitter<string>();
  constructor(private shared:SharedService,private alertify:AlertifyMessageService) { }

  ngOnInit(): void {
  }

  ondelBtn(value: string) {
    this.deleteEvent.emit(value);
  }
  Update(todo:ITodo){
    this.shared.Complete(todo).subscribe(()=> {
      this.todo.completed = !this.todo.completed;
    })
  }

}
