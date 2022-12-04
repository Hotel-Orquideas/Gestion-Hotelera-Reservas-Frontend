import { Component, OnInit } from '@angular/core';
import { Booking } from './booking';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListBookingsComponent implements OnInit {

  bookings: Booking[] = new Array;
  bkings = new Array(); //para poder exportar en excel
  cols: any[] = new Array;
  headSimple: any[] = new Array;//para exportar pdf
  empSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private bookingService: BookingService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    this.bookingService.getBookings().subscribe(
      booking => this.bookings = booking
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase booking.dato
    this.cols = [
      { field: "", header: 'Representante' },
      { field: "", header: 'Llegada' },
      { field: "", header: 'Salida' },
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Representante', 'Llegada', 'Salida']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Reservas' },
      { label: 'Reservas registradas' }
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
    doc.text('Lista de Reservas', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('reservas.pdf');
  }


  /**
   * añadir todas los reservas a una lista json
   * @returns json con todas las reservas
   */
  listBookingsJson() {
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

      const worksheet = xlsx.utils.json_to_sheet(this.listBookingsJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "reservas");
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
