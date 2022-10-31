import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { ListEmployeesComponent } from './components/employee-components/list-employees/list-employees.component';
import { RegisterEmployeeComponent } from './components/employee-components/register-employee/register-employee.component';
import { ListCompaniesComponent } from './components/company-components/list-companies/list-companies.component';
import { RegisterCompanyComponent } from './components/company-components/register-company/register-company.component';
import { ViewCompanyComponent } from './components/company-components/view-company/view-company.component';
import { ListServicesComponent } from './components/service-components/list-services/list-services.component';
import { RegisterServiceComponent } from './components/service-components/register-service/register-service.component';
import { RegisterRoomTypeComponent } from './components/roomType-components/register-room-type/register-room-type.component';
import { ListRoomTypesComponent } from './components/roomType-components/list-room-types/list-room-types.component';
import { ViewEmployeeComponent } from './components/employee-components/view-employee/view-employee.component';
import { RegisterRateComponent } from './components/rate-components/register-rate/register-rate.component';
import { ListRatesComponent } from './components/rate-components/list-rates/list-rates.component';
import { ListRoomsComponent } from './components/room-components/list-rooms/list-rooms.component';
import { ViewRoomComponent } from './components/room-components/view-room/view-room.component';
import { RegisterRoomComponent } from './components/room-components/register-room/register-room.component';

const routes: Routes = [
  {path:'employee/list-employees', component:ListEmployeesComponent},
  {path:'employee/register-employee', component:RegisterEmployeeComponent},
  {path:'employee/register-employee/:doc', component:RegisterEmployeeComponent},
  {path:'employee/view-employee/:doc', component:ViewEmployeeComponent},
  {path:'company/list-companies', component:ListCompaniesComponent},
  {path:'company/register-company', component:RegisterCompanyComponent},
  {path:'company/register-company/:nit', component:RegisterCompanyComponent},
  {path:'company/view-company/:nit', component:ViewCompanyComponent},
  {path:'service/list-services',component:ListServicesComponent},
  {path:'service/register-service',component:RegisterServiceComponent},
  {path:'service/register-service/:id',component:RegisterServiceComponent},
  {path:'roomType/list-room-types',component:ListRoomTypesComponent},
  {path:'roomType/register-room-type/:id',component:RegisterRoomTypeComponent},
  {path:'roomType/register-room-type',component:RegisterRoomTypeComponent},
  {path:'rate/list-rates',component:ListRatesComponent},
  {path:'rate/register-rate',component:RegisterRateComponent},
  {path:'rate/register-rate/:id',component:RegisterRateComponent},
  {path:'room/list-rooms', component:ListRoomsComponent},
  {path:'room/register-room', component:RegisterRoomComponent},
  {path:'room/register-room/:id', component:RegisterRoomComponent},
  {path:'room/view-room/:id', component:ViewRoomComponent},
  {path:'error-not-found',component:ErrorNotFoundComponent},
  {path:'**', redirectTo:'error-not-found', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
