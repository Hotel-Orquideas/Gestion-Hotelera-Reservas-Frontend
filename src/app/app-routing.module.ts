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
import { LoginComponent } from './components/login-components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home-components/home/home.component';
import { NologinGuard } from './guards/nologin.guard';
import { ListClientsComponent } from './components/client-components/list-clients/list-clients.component';
import { RegisterClientComponent } from './components/client-components/register-client/register-client.component';
import { ViewClientComponent } from './components/client-components/view-client/view-client.component';
import { ListPromotionsComponent } from './components/promotion-components/list-promotions/list-promotions.component';
import { RegisterPromotionComponent } from './components/promotion-components/register-promotion/register-promotion.component';
import { RegisterClientCompanyComponent } from './components/clientCompany-components/register-client-company/register-client-company.component';
import { ListBookingsComponent } from './components/booking-components/list-bookings/list-bookings.component';
import { RegisterBookingComponent } from './components/booking-components/register-booking/register-booking.component';
import { ViewBookingComponent } from './components/booking-components/view-booking/view-booking.component';

const routes: Routes = [
 
  {path:'login', component: LoginComponent, canActivate:[NologinGuard]},
  {path:'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path:'employee/list-employees', component:ListEmployeesComponent, canActivate:[AuthGuard]},
  {path:'employee/register-employee', component:RegisterEmployeeComponent, canActivate:[AuthGuard]},
  {path:'employee/register-employee/:doc', component:RegisterEmployeeComponent, canActivate:[AuthGuard]},
  {path:'employee/view-employee/:doc', component:ViewEmployeeComponent, canActivate:[AuthGuard]},
  {path:'company/list-companies', component:ListCompaniesComponent, canActivate:[AuthGuard]},
  {path:'company/register-company', component:RegisterCompanyComponent, canActivate:[AuthGuard]},
  {path:'company/register-company/:nit', component:RegisterCompanyComponent, canActivate:[AuthGuard]},
  {path:'company/view-company/:nit', component:ViewCompanyComponent, canActivate:[AuthGuard]},
  {path:'service/list-services',component:ListServicesComponent, canActivate:[AuthGuard]},
  {path:'service/register-service',component:RegisterServiceComponent, canActivate:[AuthGuard]},
  {path:'service/register-service/:id',component:RegisterServiceComponent, canActivate:[AuthGuard]},
  {path:'roomType/list-room-types',component:ListRoomTypesComponent, canActivate:[AuthGuard]},
  {path:'roomType/register-room-type/:id',component:RegisterRoomTypeComponent, canActivate:[AuthGuard]},
  {path:'roomType/register-room-type',component:RegisterRoomTypeComponent, canActivate:[AuthGuard]},
  {path:'rate/list-rates',component:ListRatesComponent, canActivate:[AuthGuard]},
  {path:'rate/register-rate',component:RegisterRateComponent, canActivate:[AuthGuard]},
  {path:'rate/register-rate/:id',component:RegisterRateComponent, canActivate:[AuthGuard]},
  {path:'room/list-rooms', component:ListRoomsComponent, canActivate:[AuthGuard]},
  {path:'room/register-room', component:RegisterRoomComponent, canActivate:[AuthGuard]},
  {path:'room/register-room/:id', component:RegisterRoomComponent, canActivate:[AuthGuard]},
  {path:'room/view-room/:id', component:ViewRoomComponent, canActivate:[AuthGuard]},
  {path:'client/list-clients', component:ListClientsComponent, canActivate:[AuthGuard]},
  {path:'client/register-client', component:RegisterClientComponent, canActivate:[AuthGuard]},
  {path:'client/register-client/:doc', component:RegisterClientComponent, canActivate:[AuthGuard]},
  {path:'client/register-client/:res/:doc', component:RegisterClientComponent, canActivate:[AuthGuard]},
  {path:'client/view-client/:doc', component:ViewClientComponent, canActivate:[AuthGuard]},
  {path:'promotion/list-promotions', component:ListPromotionsComponent, canActivate:[AuthGuard]},
  {path:'promotion/register-promotion', component:RegisterPromotionComponent, canActivate:[AuthGuard]},
  {path:'promotion/register-promotion/:id', component:RegisterPromotionComponent, canActivate:[AuthGuard]},
  {path:'clientCompany/register-clientCompany', component:RegisterClientCompanyComponent, canActivate:[AuthGuard]},
  {path:'clientCompany/register-clientCompany:clientId', component:RegisterClientCompanyComponent, canActivate:[AuthGuard]},
  {path:'booking/list-bookings', component:ListBookingsComponent, canActivate:[AuthGuard]},
  {path:'booking/register-booking', component:RegisterBookingComponent, canActivate:[AuthGuard]},
  {path:'booking/view-booking', component:ViewBookingComponent, canActivate:[AuthGuard]},
  {path:'error-not-found',component:ErrorNotFoundComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'**', redirectTo:'error-not-found', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
