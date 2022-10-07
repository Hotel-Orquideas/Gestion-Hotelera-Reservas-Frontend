import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { RegisterEmployeeComponent } from './components/register-employee/register-employee.component';

const routes: Routes = [
  {path:'list-employees', component:ListEmployeesComponent},
  {path:'register-employee', component:RegisterEmployeeComponent},
  {path:'register-employee/:doc', component:RegisterEmployeeComponent},
  {path:'error-not-found',component:ErrorNotFoundComponent},
  {path:'**', redirectTo:'error-not-found', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
