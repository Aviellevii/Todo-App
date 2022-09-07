import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../model/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly api;
  constructor(private http:HttpClient) { 
    this.api = 'http://localhost:3000/todo/';
  }
  getTodos():Observable<ITodo[]>{
    return this.http.get<ITodo[]>(this.api);
  }
  getOneTodo(id:number){
    return this.http.get(this.api + id);
  }
  AddTodo(todo:ITodo){
    return this.http.post(this.api,todo);

  }
  deleteTodo(id:string){
    return this.http.delete(this.api + id);
  }
  UpdateTodo(id:string,todo:any){
    return this.http.patch(this.api + id,todo);
  }
  Complete(todo:any){
    return this.http.patch(this.api + todo._id,{completed:!todo.completed});
  }

}
