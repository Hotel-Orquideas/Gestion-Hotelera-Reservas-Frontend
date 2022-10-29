import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { Router } from '@angular/router';
import { Employee } from './employee';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';
import { FormArrayName } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class ListEmployeesComponent implements OnInit {
  
  employees: Employee[] = new Array;
  emps = new Array(); //para poder exportar en excel
  cols: any[] = new Array;
  headSimple: any[] = new Array;//para exportar pdf
  empSimple:any[]= new Array;//para exportar pdf
  dataTable:any[]= new Array;//para exportar pdf
  items: MenuItem[]=new Array;//para breadcrumb
  home: MenuItem={};//para breadcrumb


  constructor(private employeeService: EmployeeService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.employeeService.getEmployees().subscribe(
      employee => this.employees = employee
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase employee.person.dato
    this.cols = [
      { field: "person.name", header: 'Nombre' },
      { field: "person.lastName", header: 'Apellido' },
      { field: "position", header: 'Cargo' },
      { field: "person.documentType", header: 'TipoDocumento' },
      { field: "person.document", header: 'Documento' },
      { field: "person.genre", header: 'Genero' },
      { field: "person.birthdate", header: 'Cumpleaños' },
      { field: "person.phoneNumber", header: 'Telefono' },
      { field: "person.email", header: 'Correo' },
      { field: "person.bloodType", header: 'TipoSangre' }
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Nombre', 'Apellido', 'Cargo', 'Tipo Documento', 'Documento', 'Genero','Telefono','Correo']]
    

    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Empleado' },
      { label: 'Empleados registrados' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //función para eliminar el empleado
  delete(doc: string) {
    var nameEmployee: string = "";
    var lastNameEmployee: string = "";

    for (var i = 0; i < this.employees.length; i++) {
      if (this.employees[i].person.document == doc) {
        nameEmployee = this.employees[i].person.name;
        lastNameEmployee = this.employees[i].person.lastName
      }
    }



    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar al empleado ' + nameEmployee + ' ' + lastNameEmployee + '?',
      header: 'Confirmación para eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Aprobado', detail: 'Empleado eliminado correctamente', life: 3000 });
        this.employeeService.deleteEmployee(doc).subscribe(
          emp => {
            this.employeeService.getEmployees().subscribe(
              response => this.employees = response
            )

          }

        );
      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Se ha cancelado la operación.', life: 3000 });
        this.employeeService.getEmployees()
      }
    });
  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable(){
    for (var i = 0; i < this.employees.length; i++) { 
     let emp1=[
        this.employees[i].person.name,
        this.employees[i].person.lastName,
        this.employees[i].position,
        this.employees[i].person.typeDocument,
        this.employees[i].person.document,
        this.employees[i].person.genre,
        this.employees[i].person.phoneNumber,
        this.employees[i].person.email,
      ];
      this.dataTable.push(emp1);
    }
    return this.dataTable;
  }



  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Lista de Empleados', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('empleados.pdf');
  }


  /**
   * añadir todos los empleados a una lista json
   * @returns json con todos los empelados
   */
  listEmpsJson(){
    for (var i = 0; i < this.employees.length; i++) { 
      this.emps.push({
        Nombre:this.employees[i].person.name,
        Apellido:this.employees[i].person.lastName,
        Cargo:this.employees[i].position,
        tipoDocumento:this.employees[i].person.typeDocument,
        Documento:this.employees[i].person.document,
        Genero:this.employees[i].person.genre,
        Nacimiento: this.employees[i].person.birthdate,
        Telefono:this.employees[i].person.phoneNumber,
        Correo:this.employees[i].person.email,
        TipoSangre:this.employees[i].person.bloodType
      });
    }
    return this.emps;
  }


  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.listEmpsJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "empleados");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {

    
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

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


}
