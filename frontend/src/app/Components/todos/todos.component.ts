import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/model/todo.interface';
import { AlertifyMessageService } from 'src/app/Services/alertify-message.service';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos!:ITodo[];
  filteredValue = '';
  constructor(private shared:SharedService,private alertify:AlertifyMessageService) { }

  ngOnInit(): void {
    this.shared.getTodos().subscribe((todos)=>{
      this.todos = todos
    })
  }
  ondel(id: string) {
    this.shared.deleteTodo(id).subscribe(()=>{
      this.alertify.error('deleted');
      this.todos = this.todos.filter(x => x._id !== id)
    })
  }
}
