import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { RoomTypeService } from 'src/app/services/roomType-service/room-type.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  
  
  menuItems: MenuItem[];
  itemsMenuAvatar: MenuItem[];

  constructor(private router: Router) { }

  ngOnInit(): void {

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
            label:'Promociones',
            icon:'fa-solid fa-percent',
            items:[
              {
                label:'Listar promociones',
                icon:'fa-solid fa-splotch',
                url: 'promotion/list-promotions'
              },
              {
                label:'Registrar promoción',
                icon:'fa-solid fa-circle-dollar-to-slot',
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
            icon:'fa-solid fa-people-pulling',
            url:'clientCompany/register-clientCompany'
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
        label: 'Rol: Administrador'
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

  logout(){
    localStorage.removeItem("x-token");
    this.router.navigate(['login']);
  }

}
