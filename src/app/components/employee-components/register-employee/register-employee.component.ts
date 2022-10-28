import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { Employee } from '../list-employees/employee';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css'],
})
export class RegisterEmployeeComponent implements OnInit {


  public formRegister : FormGroup= new FormGroup<any>('');//para formulario registrar
  

  employee: Employee = new Employee();
  documentTypes: any = new Array;//para option
  genres: any = new Array;//para option
  rhs: any = new Array;//para option
  minDate: Date=new Date;
  maxDate: Date=new Date;
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar empleado
  home: MenuItem = {};//para breadcrumb


  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr:ToastrService) { }

  ngOnInit(): void {


    //validaciones básicas para el formulario de registrar
    this.formRegister= this.formBuilder.group({
      name:['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      lastName:['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      documentType:['', [
        Validators.required,
      ]],
      document:['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(11)
      ]],
      phoneNumber:['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15)
      ]],
      position:['', [
        Validators.required
      ]],
      email:['', [
        Validators.required,
        Validators.email
      ]],
      genre:['', [
        Validators.required
      ]],
      bloodType:['', [
        Validators.required
      ]],
      birthdate:['', [
      ]]
    });

    this.cargar(); //llena el formulario si existe documento en el parametro url

    //para option documentoType
    this.documentTypes = [
      { type: 'Cédula de Ciudadanía', valueType: 'CC' },
      { type: 'Pasaporte', valueType: 'PP' },
      { type: 'Tarjeta de Identidad', valueType: 'TI' },
      { type: 'Cédula de Extranjería', valueType: 'CE' }
    ];

    //para option genre
    this.genres = [
      { genre: 'Masculino', "employee.genre": 'M' },
      { genre: 'Femenino', "employee.genre": 'F' },
      { genre: 'Otro', "employee.genre": 'O' }
    ];

    //para option rh
    this.rhs = [
      { rh: 'O+'},
      { rh: 'O-'},
      { rh: 'A+'},
      { rh: 'A-'},
      { rh: 'B+'},
      { rh: 'B-'},
      { rh: 'AB+'},
      { rh: 'AB-'}
    ];

    //condiciones fecha, no puede tener menos de 18 años, no puede tener más de 60 años
    this.minDate.setFullYear(new Date().getFullYear() - 60);
    this.maxDate.setFullYear(new Date().getFullYear() - 18);


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

  cargar(): void {
    this.activatedRoute.params.subscribe(
      emp => {
        let id = emp['doc'];
        if (id) {
          this.employeeService.getEmployee(id).subscribe(
            es => this.employee = es
          );
          
        }
      }
    );

  }

  register(): void {

    
    this.employeeService.registerEmployee(this.employee).subscribe(
      res => {
        this.toastr.success('El empleado se ha registrado satisfactoriamente.', 'Registro empleado',{
          closeButton:true,
          progressBar:true
        });
        this.router.navigate(['/employee/list-employees'])}
    );
  }

  update(): void {
    this.employeeService.updateEmployee(this.employee).subscribe(
      emp => {
        this.toastr.info('El empleado se ha actualizado satisfactoriamente.', 'Actualziar empleado', {
          closeButton:true,
          progressBar:true
        });
        this.router.navigate(['/employee/list-employees'])}
    );
  }

}
