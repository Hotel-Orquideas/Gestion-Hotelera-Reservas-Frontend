import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { ListEmployeesComponent } from './components/employee-components/list-employees/list-employees.component';
import { RegisterEmployeeComponent } from './components/employee-components/register-employee/register-employee.component';
import { ListCompaniesComponent } from './components/company-components/list-companies/list-companies.component';
import { RegisterCompanyComponent } from './components/company-components/register-company/register-company.component';
import { ViewCompanyComponent } from './components/company-components/view-company/view-company.component';

const routes: Routes = [
  {path:'employee/list-employees', component:ListEmployeesComponent},
  {path:'employee/register-employee', component:RegisterEmployeeComponent},
  {path:'employee/register-employee/:doc', component:RegisterEmployeeComponent},
  {path:'company/list-companies', component:ListCompaniesComponent},
  {path:'company/register-company', component:RegisterCompanyComponent},
  {path:'company/register-company/:nit', component:RegisterCompanyComponent},
  {path:'company/view-company/:nit', component:ViewCompanyComponent},
  {path:'error-not-found',component:ErrorNotFoundComponent},
  {path:'**', redirectTo:'error-not-found', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
