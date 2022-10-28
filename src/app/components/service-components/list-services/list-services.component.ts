import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service-service/service.service';
import { Router } from '@angular/router';
import { Service } from './service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css']
})
export class ListServicesComponent implements OnInit {

  services: Service[] = new Array;
  servs = new Array(); //para poder exportar en excel
  cols: any[] = new Array;//para exportar en CSV
  headSimple: any[] = new Array;//para exportar pdf
  compSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private serviceService: ServiceService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.serviceService.getServices().subscribe(
      service => this.services = service
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase
    this.cols = [
      { field: "id", header: 'Identificador' },
      { field: "name", header: 'Nombre' },
      { field: "pricePerUnit", header: 'Precio Unitario' }
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Identificador', 'Nombre', 'Precio Unitario']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Servicio' },
      { label: 'Servicios registrados' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //eliminar servicio
  delete(id: number) {
    var nameService: string = "";

    for (var i = 0; i < this.services.length; i++) {
      if (this.services[i].id == id) {
        nameService = this.services[i].name;
      }
    }



    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar el servicio ' + nameService + ' ?',
      header: 'Confirmación para eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Aprobado', detail: 'Servicio eliminado correctamente', life: 3000 });
        this.serviceService.deleteService(id).subscribe(
          emp => {
            this.serviceService.getServices().subscribe(
              response => this.services = response
            )

          }

        );
      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Se ha cancelado la operación.', life: 3000 });
        this.serviceService.getServices()
      }
    });
  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.services.length; i++) {
      let serv1 = [
        this.services[i].id,
        this.services[i].name,
        this.services[i].pricePerUnit
      ];
      this.dataTable.push(serv1);
    }
    return this.dataTable;
  }


  //exportar datos como pdf
  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Lista de Servicios', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('servicios.pdf');
  }


  /**
   * añadir todos los servicios a una lista json
   * @returns json con todos los servicios
   */
  listServicesJson() {
    for (var i = 0; i < this.services.length; i++) {
      this.servs.push({
        Identificador: this.services[i].id,
        Nombre: this.services[i].name,
        PrecioUnitario: this.services[i].pricePerUnit
      });
    }
    return this.servs;
  }


  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.listServicesJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "servicios");
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

}
