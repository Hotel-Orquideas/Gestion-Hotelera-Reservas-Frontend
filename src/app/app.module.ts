import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ListEmployeesComponent } from './components/employee-components/list-employees/list-employees.component';
import { RegisterEmployeeComponent } from './components/employee-components/register-employee/register-employee.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { RegisterCompanyComponent } from './components/company-components/register-company/register-company.component';
import { ListCompaniesComponent } from './components/company-components/list-companies/list-companies.component';
import { ViewCompanyComponent } from './components/company-components/view-company/view-company.component';
import { RegisterServiceComponent } from './components/service-components/register-service/register-service.component';
import { ListServicesComponent } from './components/service-components/list-services/list-services.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterRoomTypeComponent } from './components/roomType-components/register-room-type/register-room-type.component';
import { ListRoomTypesComponent } from './components/roomType-components/list-room-types/list-room-types.component';
import { ViewEmployeeComponent } from './components/employee-components/view-employee/view-employee.component';

import { ToastrModule } from 'ngx-toastr';

import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import {KeyFilterModule} from 'primeng/keyfilter';
import {AvatarModule} from 'primeng/avatar';
import {MenubarModule} from 'primeng/menubar';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {BadgeModule} from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {RatingModule} from 'primeng/rating';

import { RegisterRateComponent } from './components/rate-components/register-rate/register-rate.component';
import { ListRatesComponent } from './components/rate-components/list-rates/list-rates.component';
import { RegisterRoomComponent } from './components/room-components/register-room/register-room.component';
import { ListRoomsComponent } from './components/room-components/list-rooms/list-rooms.component';
import { ViewRoomComponent } from './components/room-components/view-room/view-room.component';
import { LoginComponent } from './components/login-components/login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HomeComponent } from './components/home-components/home/home.component';
import { ListClientsComponent } from './components/client-components/list-clients/list-clients.component';
import { RegisterClientComponent } from './components/client-components/register-client/register-client.component';
import { ViewClientComponent } from './components/client-components/view-client/view-client.component';
import { RegisterPromotionComponent } from './components/promotion-components/register-promotion/register-promotion.component';
import { ListPromotionsComponent } from './components/promotion-components/list-promotions/list-promotions.component';
import { RegisterClientCompanyComponent } from './components/clientCompany-components/register-client-company/register-client-company.component';





@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListEmployeesComponent,
    RegisterEmployeeComponent,
    ErrorNotFoundComponent,
    RegisterCompanyComponent,
    ListCompaniesComponent,
    ViewCompanyComponent,
    RegisterServiceComponent,
    ListServicesComponent,
    RegisterRoomTypeComponent,
    ListRoomTypesComponent,
    ViewEmployeeComponent,
    RegisterRateComponent,
    ListRatesComponent,
    RegisterRoomComponent,
    ListRoomsComponent,
    ViewRoomComponent,
    LoginComponent,
    HomeComponent,
    ListClientsComponent,
    RegisterClientComponent,
    ViewClientComponent,
    RegisterPromotionComponent,
    ListPromotionsComponent,
    RegisterClientCompanyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    BreadcrumbModule,
    ToastrModule.forRoot(),
    CalendarModule,
    KeyFilterModule,
    AvatarModule,
    MenubarModule,
    TieredMenuModule,
    InputNumberModule,
    InputMaskModule,
    BadgeModule,
    RippleModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    RatingModule
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
