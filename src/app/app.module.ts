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
    ListServicesComponent
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
    InputNumberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
