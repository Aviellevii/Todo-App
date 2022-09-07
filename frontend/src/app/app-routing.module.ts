import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';
import { AddTodoComponent } from './Components/add-todo/add-todo.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { RegisterPageComponent } from './Components/register-page/register-page.component';
import { TodosComponent } from './Components/todos/todos.component';
const routes: Routes = [
  {path:'',component:TodosComponent,canActivate:[AuthGuard]},
  {path:'add',component:AddTodoComponent,canActivate:[AuthGuard]},
  {path:'add/:id',component:AddTodoComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
