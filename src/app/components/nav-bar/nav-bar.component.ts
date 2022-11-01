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

  constructor() { }

  ngOnInit(): void {

    //items del menú principal
    this.menuItems = [
      {
        label: 'Colaboradores',
        icon: 'fa-solid fa-person',
        items: [
          {
            label: 'Registrar',
            icon: 'fa-solid fa-user-plus',
            url: 'employee/register-employee'
          },
          {
            label: 'Listar',
            icon: 'fa-solid fa-user-group',
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
          }
        ]
      }, {
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
        icon: 'fa-solid fa-arrow-right-from-bracket'
      }
    ]


  }

}
