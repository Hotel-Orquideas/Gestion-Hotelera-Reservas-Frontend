import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import decode from 'jwt-decode';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { Employee } from '../employee-components/list-employees/employee';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  employee: Employee;
  menuItems: MenuItem[];
  itemsMenuAvatar: MenuItem[];

  constructor(private router: Router, private employeeService: EmployeeService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {

    //cargar los datos del empleado que inicia sesión
    this.loadEmployeeLogin();

    //items del menú principal
    this.menuItems = [
      {
        label: 'Colaboradores',
        icon: 'fa-solid fa-person',
        items: [
          {
            label: 'Registrar',
            icon: 'fa-solid fa-person-circle-plus',
            url: 'employee/register-employee'
          },
          {
            label: 'Listar',
            icon: 'fa-solid fa-people-group',
            url: 'employee/list-employees'
          }
        ]
      },
      {
        label: 'Empresas',
        icon: 'fa-solid fa-building',
        items: [
          {
            label: 'Registrar',
            icon: 'fa-sharp fa-solid fa-building-circle-arrow-right',
            url: 'company/register-company'
          },
          {
            label: 'Listar',
            icon: 'fa-solid fa-city',
            url: 'company/list-companies'
          },
          {
            label: 'Promociones',
            icon: 'fa-solid fa-percent',
            items: [
              {
                label: 'Listar promociones',
                icon: 'fa-solid fa-splotch',
                url: 'promotion/list-promotions'
              },
              {
                label: 'Registrar promoción',
                icon: 'fa-solid fa-circle-dollar-to-slot',
                url: 'promotion/register-promotion'
              }
            ]
          }
        ]
      },
      {
        label: 'Clientes',
        icon: 'fa-solid fa-users',
        items: [
          {
            label: 'Registrar',
            icon: 'fa-solid fa-user-plus',
            url: 'client/register-client'
          },
          {
            label: 'Listar',
            icon: 'fa-solid fa-user-group',
            url: 'client/list-clients'
          },
          {
            label: 'Vincular a empresa',
            icon: 'fa-solid fa-people-pulling',
            url: 'clientCompany/register-clientCompany'
          }
        ]
      },
      {
        label: 'Reservas',
        icon: 'fa-solid fa-calendar-week',
        items: [
          {
            label: 'Reservar',
            icon: 'fa-regular fa-calendar-plus',
            url: 'booking/register-booking'
          },
          {
            label: 'Listar reservas',
            icon: 'fa-solid fa-calendar-week',
            url: 'booking/list-bookings'
          },
          {
            label: 'Reservas en CheckIn',
            icon: 'fa-regular fa-calendar-check',
            url: 'booking/list-bookings-checkin'
          },
          {
            label: 'Calendario',
            icon: 'fa-solid fa-calendar-days',
            url: 'booking/calendar-bookings'
          }
        ]
      },
      {
        label:'Pagos',
        icon:'fa-solid fa-file-invoice',
        items:[
          {
            label:'Listar facturas',
            icon:'fa-solid fa-file-invoice-dollar',
            url:'bill/list-bills'
          }
        ]
      },
      {
        label: 'Gestión',
        icon: 'fa-solid fa-toolbox',
        items: [
          {
            label: 'Servicios',
            icon: 'fa-solid fa-bell-concierge',
            items: [
              {
                label: 'Agregar nuevo',
                icon: 'fa-regular fa-square-plus',
                url: 'service/register-service'
              },
              {
                label: 'Listar',
                icon: 'fa-solid fa-hand-holding',
                url: 'service/list-services'
              }
            ]
          },
          {
            label: 'Tipos de Habitación',
            icon: 'fa-solid fa-people-roof',
            items: [
              {
                label: 'Agregar tipo',
                icon: 'fa-solid fa-file-circle-plus',
                url: 'roomType/register-room-type'
              },
              {
                label: 'Listar tipos',
                icon: 'fa-solid fa-clipboard-list',
                url: 'roomType/list-room-types'
              }
            ]
          },
          {
            label: 'Tarifas',
            icon: 'fa-brands fa-sellcast',
            items: [
              {
                label: 'Agregar Tarifa',
                icon: 'fa-solid fa-file-invoice-dollar',
                url: 'rate/register-rate',
              },
              {
                label: 'Listar Tarfas',
                icon: 'fa-solid fa-filter-circle-dollar',
                url: 'rate/list-rates'
              },
            ]
          },
          {
            label: 'Habitaciones',
            icon: 'fa-solid fa-person-shelter',
            items: [
              {
                label: 'Agregar Habitación',
                icon: 'fa-solid fa-door-closed',
                url: 'room/register-room'
              },
              {
                label: 'Listar Habitaciones',
                icon: 'fa-solid fa-elevator',
                url: 'room/list-rooms'
              }
            ]
          },
          {
            label: 'Metodos de pago',
            icon: 'fa-regular fa-credit-card',
            items: [
              {
                label: 'Agregar método',
                icon: 'fa-solid fa-money-check-dollar',
                url: 'paymentMethod/register-payment-method'
              },
              {
                label: 'Listar métodos',
                icon: 'fa-solid fa-file-invoice-dollar',
                url: 'paymentMethod/list-payment-methods'
              }
            ]
          }
        ]
      }
    ]

    //items menu 
    this.itemsMenuAvatar = [
      {
        label: ''
      },
      {
        separator: true
      },
      {
        label: 'Configuración',
        icon: 'fa-solid fa-gear'
      },
      {
        label: 'Cerrar Sesión',
        icon: 'fa-solid fa-arrow-right-from-bracket',
        command: (event) => this.logout()
      }
    ]


  }

  //se cierra sesión
  logout() {
    localStorage.removeItem("x-token");
    this.router.navigate(['login']);
  }

  //cargamos los datos del empelado que inició sesión (id a partir del token)
  loadEmployeeLogin() {
    const token = localStorage.getItem('x-token');
    
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('x-token')) {

    } else {
      const { uid, email }: any = decode(token);

      this.employeeService.getEmployeeById(parseInt(uid)).subscribe(
        emp => {
          this.employee = emp;
        }
      );
    }

  }

  //tomamos el nombre y el apellido, luego retornamos la primer letra del primer nombre y la del primer apellido
  getFirstLetter(): string {

    const splitName: String[] = this.employee.person.name.split(" ");
    const splitLastName: String[] = this.employee.person.lastName.split(" ");

    const firstName: String = splitName[0];
    const firstLastName: String = splitLastName[0];

    return firstName[0] + firstLastName[0];
  }

  //al items del menuavatar se le asigna el rol cuando se le de click al menu
  loadRoleName() {
    this.itemsMenuAvatar[0].label = 'Rol: ' + this.employee.role.name;
  }


}
