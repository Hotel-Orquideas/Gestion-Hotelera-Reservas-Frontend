import { Component, OnInit } from '@angular/core';
import { Booking } from '../list-bookings/booking';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Booking2 } from '../list-bookings/booking2';
import { BookingClientService } from 'src/app/services/bookingClient-service/booking-client.service';
import { Client } from '../../client-components/list-clients/client';
import { ClientService } from 'src/app/services/client-service/client.service';

@Component({
  selector: 'app-list-bookings-checkin',
  templateUrl: './list-bookings-checkin.component.html',
  styleUrls: ['./list-bookings-checkin.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListBookingsCheckinComponent implements OnInit {

  bookings: Booking2[] = new Array;
  clientsInBookingSelected:Client[]=new Array();//cuando se vaya a hacer checkout se obtienen todos los clientes de la reserva y se cambian a estado I
  bkings = new Array(); //para poder exportar en excel
  cols: any[] = new Array;
  headSimple: any[] = new Array;//para exportar pdf
  empSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  //para probar
  bookings2:any=[
    {
      "id":1,
      "state":"IN",
      "checkInDate":'03/12/2022',
      "checkOutDate":'07/12/2022'
    },
    {
      "id":2,
      "state":"IN",
      "checkInDate":'03/12/2022',
      "checkOutDate":'04/12/2022'
    },
    {
      "id":3,
      "state":"IN",
      "checkInDate":'03/12/2022',
      "checkOutDate":'09/12/2022'
    },
  ];

  constructor(private clientService:ClientService,private bookingClientService:BookingClientService,private bookingService: BookingService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    //se obtienen todas las reservas con estado en checkin
    this.bookingService.getBookingsCheckIn().subscribe(
      booking => this.bookings = booking
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase booking.dato
    this.cols = [
      { field: "id", header: 'Representante' },
      { field: "checkInDate", header: 'Llegada' },
      { field: "checkOutDate", header: 'Salida' },
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Representante', 'Llegada', 'Salida']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Reservas' },
      { label: 'Reservas en CheckIn' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/home' };

  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.bookings.length; i++) {
      let bk = [
        this.bookings[i].id,
        this.bookings[i].checkInDate,
        this.bookings[i].checkOutDate,

      ];
      this.dataTable.push(bk);
    }
    return this.dataTable;
  }



  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Lista de Reservas en checkin', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('reservas-checkin.pdf');
  }


  /**
   * añadir todas los reservas a una lista json
   * @returns json con todas las reservas
   */
  listBookingsCheckInJson() {
    for (var i = 0; i < this.bookings.length; i++) {
      this.bkings.push({
        Representante: this.bookings[i].id,
        Llegada: this.bookings[i].checkInDate,
        Salida: this.bookings[i].checkOutDate,
      });
    }
    return this.bkings;
  }


  exportExcel() {
    import("xlsx").then(xlsx => {

      const worksheet = xlsx.utils.json_to_sheet(this.listBookingsCheckInJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "reservas-checkin");
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


  //función para cambiar el estado de la reserva en inactiva "checkout"
  setCheckOut(bookingId: number) {

    this.confirmationService.confirm({
      message: 'Está seguro que desea hacer el checkOut ahora mismo?',
      header: 'Confirmación CheckOut',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        //cambiar el estado de los clientes a I
        this.bookingClientService.getClients(bookingId).subscribe(
          client => {
            this.clientsInBookingSelected =client;
            
            this.clientService.changeStateClients(this.listClientsJson(client)).subscribe(
    
              res=>{
                this.messageService.add({ severity: 'success', summary: 'Aprobado', detail: 'Se han sacado los clientes de la reserva correctamente.', life: 3000 });
              }
    
            );
    
          }
        );

        //cambiar estado de la reserva para C
        this.bookingService.updateStateBooking(bookingId,'B').subscribe(
          res => {
            this.messageService.add({ severity: 'success', summary: 'Aprobado', detail: 'Se ha hecho el checkOut correctamente', life: 3000 });
            this.bookingService.getBookingsCheckIn().subscribe(
              response => this.bookings = response
            );
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un evento inesperado al hacer checkout '+ error.status, life: 3000 });
          }
        );

      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Se ha cancelado la operación.', life: 3000 });
        this.bookingService.getBookingsCheckIn();
      }
    });

  }

  //Metodo para enviar una lista con todos los id para poder cambiar de estado a todos.
  listClientsJson(list:Client[]){
    let listReturn:any[]=new Array();

    for (let i = 0; i < list.length; i++) {
      
      listReturn.push({
        "id":list[i].client.id
      });
  
    }

    return listReturn;
  }

}
