import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import { ClientService } from 'src/app/services/client-service/client.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListClientsComponent implements OnInit {

  clients: Client[] = new Array;
  clnts = new Array(); //para poder exportar en excel
  cols: any[] = new Array;
  headSimple: any[] = new Array;//para exportar pdf
  empSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private clientService: ClientService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    this.clientService.getClients().subscribe(
      client => this.clients = client
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase client.person.dato
    this.cols = [
      { field: "person.name", header: 'Nombre' },
      { field: "person.lastName", header: 'Apellido' },
      { field: "person.documentType", header: 'TipoDocumento' },
      { field: "person.document", header: 'Documento' },
      { field: "person.genre", header: 'Genero' },
      { field: "person.birthdate", header: 'Cumpleaños' },
      { field: "person.phoneNumber", header: 'Telefono' },
      { field: "person.email", header: 'Correo' },
      { field: "person.bloodType", header: 'TipoSangre' },
      { field: "countryOrigin", header: 'PaisOrigen' },
      { field: "cityOrigin", header: 'CiudadOrigen' },
      { field: "countryDestination", header: 'PaisDestino' },
      { field: "cityDestination", header: 'CiudadDestino' },
      { field: "profession", header: 'Profesion' }


    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Nombre', 'Apellido', 'Tipo Documento', 'Documento', 'Telefono', 'Correo']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Cliente' },
      { label: 'Clientes registrados' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //función para eliminar cliente
  delete(doc: string) {
    var nameClient: string = "";
    var lastNameClient: string = "";

    for (var i = 0; i < this.clients.length; i++) {
      if (this.clients[i].person.document == doc) {
        nameClient = this.clients[i].person.name;
        lastNameClient = this.clients[i].person.lastName
      }
    }



    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar al cliente ' + nameClient + ' ' + lastNameClient + '?',
      header: 'Confirmación para eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.clientService.deleteClient(doc).subscribe(
          cl => {
            this.clientService.getClients().subscribe(
              response => this.clients = response
            )
            this.messageService.add({ severity: 'success', summary: 'Aprobado', detail: 'Cliente eliminado correctamente', life: 3000 });

          },
          error => {
            //mejorar este mensaje - mostrando las tarifas y habitaciones que dependen de este
            this.messageService.add({
              severity: 'error', summary: 'Error al eliminar',
              detail: "Error "+ error.status,
              life: 3000
            })
          }

        );
      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Se ha cancelado la operación.', life: 3000 });
        this.clientService.getClients()
      }
    });
  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.clients.length; i++) {
      let cl1 = [
        this.clients[i].person.name,
        this.clients[i].person.lastName,
        this.clients[i].person.typeDocument,
        this.clients[i].person.document,
        this.clients[i].person.phoneNumber,
        this.clients[i].person.email,
      ];
      this.dataTable.push(cl1);
    }
    return this.dataTable;
  }



  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Lista de Clientes', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('clientes.pdf');
  }


  /**
   * añadir todos los clientes a una lista json
   * @returns json con todos los clientes
   */
  listClientsJson() {
    for (var i = 0; i < this.clients.length; i++) {
      this.clnts.push({
        Nombre: this.clients[i].person.name,
        Apellido: this.clients[i].person.lastName,
        tipoDocumento: this.clients[i].person.typeDocument,
        Documento: this.clients[i].person.document,
        Nacimiento: this.clients[i].person.birthdate,
        PaisOrigen: this.clients[i].countryOrigin,
        CiudadOrigen: this.clients[i].cityOrigin,
        PaisDestino: this.clients[i].countryDestination,
        CiudadDestino: this.clients[i].cityDestination,
        Profesion: this.clients[i].profession,
        Telefono: this.clients[i].person.phoneNumber,
        Correo: this.clients[i].person.email,
        TipoSangre: this.clients[i].person.bloodType
      });
    }
    return this.clnts;
  }


  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.listClientsJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "clientes");
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
