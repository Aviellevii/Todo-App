import { Injectable } from '@angular/core';
declare let alertify:any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyMessageService {

  constructor() { }
  
  success(message :string){
    alertify.success(message);
  }
  
  error(message :string){
    alertify.error(message);
  }
}
