import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../list-employees/employee';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css'],
})
export class RegisterEmployeeComponent implements OnInit {


 

  employee:Employee= new Employee();
  items: MenuItem[]=new Array;//para breadcrumb
  itemsElse: MenuItem[]=new Array;//para breadcrumb cuando es actualizar empleado
  home: MenuItem={};//para breadcrumb
  

  constructor(private employeeService:EmployeeService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
        //etiquetas para el breadcrumb
        this.items = [
          { label: 'Empleado' },
          { label: 'Registrar empleado' }
        ];

         //etiquetas para el breadcrumb cuando es actualziar empleado
         this.itemsElse = [
          { label: 'Empleado' },
          { label: 'Actualizar empleado' }
        ];
    
        //icono de casa pra el breadcrumb
        this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      emp=>{
        let id=emp['doc'];
        if(id){
          
          this.employeeService.getEmployee(id).subscribe(
            es=>this.employee=es
          );
        }
      }
    );
    
  }

  register():void{
    
    //alert("Empleado creado correctamente."+ this.employee.birthdate);
    this.employeeService.registerEmployee(this.employee).subscribe(
      res=>this.router.navigate(['/list-employees'])
    );
  }

  update():void{
    alert("empleado actualizado correctamente: "+ this.employee.id);
    this.employeeService.updateEmployee(this.employee).subscribe(
      emp=>this.router.navigate(['/list-employees'])
    );
  }

}
