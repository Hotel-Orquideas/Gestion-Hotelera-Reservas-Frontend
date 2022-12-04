import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../list-employees/employee';
import { MenuItem } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  employee: Employee;
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    this.activatedRoute.params.subscribe(

      emp => {
        let doc = emp['doc'];
        if (doc) {
          this.employeeService.getEmployee(doc).subscribe(
            es => this.employee = es
          );

        }
      }
    );

    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Colaborador' },
      { label: 'Colaboradores registradoss', url: 'employee/list-employees' },
      { label: 'Visualizar colaborador' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/home' };

  }

    //función para texto en badge
    textInBadge(status:string):string{

      if (status=="A") {
        return "Activo"
      }else if(status=="B"){
        return "Bloqueado"
      }else{
        return "Sin estado - error"
      }
  
    }
  
  
    //función para color del badge
    colorInBadge(status:string):string{
  
      if (status=="A") {
        return "success"
      }else if(status=="B"){
        return "warning"
      }else{
        return "Sin color - error"
      }
  
    }

    genreInText(genre:string):string{
      
      if(genre=="F"){
        return "Femenino";
      }else if(genre=="M"){
        return "Masculino";
      }else if(genre=="O"){
        return "Otro";
      }else{
        return "Sin género - error";
      }

    }

}
