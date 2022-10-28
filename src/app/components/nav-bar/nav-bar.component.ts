import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { isConditionalExpression } from 'typescript';

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
      },{
        label:'Administración',
        icon:'fa-solid fa-toolbox',
        items:[
          {
            label:'Servicios',
            icon:'fa-solid fa-bell-concierge',
            items:[
              {
                label:'Agregar nuevo',
                icon:'fa-regular fa-square-plus',
                url:'service/register-service'
              },
              {
                label:'Listar',
                icon:'fa-solid fa-hand-holding',
                url:'service/list-services'
              }
            ]
          }
        ]
      }
    ]

    //items menu 
    this.itemsMenuAvatar=[
      {
        label:'Rol: Administrador'
      },
      {
        separator:true
      },
      {
        label:'Configuración',
        icon:'fa-solid fa-gear'
      },
      {
        label:'Cerrar Sesión',
        icon:'fa-solid fa-arrow-right-from-bracket'
      }
    ]





  }



}
