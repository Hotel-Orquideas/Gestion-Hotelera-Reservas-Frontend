import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomType } from './roomType';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import { MenuItem } from 'primeng/api';
import { RoomTypeService } from 'src/app/services/roomType-service/room-type.service';

@Component({
  selector: 'app-list-room-types',
  templateUrl: './list-room-types.component.html',
  styleUrls: ['./list-room-types.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListRoomTypesComponent implements OnInit {

  roomTypes: RoomType[] = new Array;
  rtype = new Array(); //para poder exportar en excel
  cols: any[] = new Array;//para exportar en CSV
  headSimple: any[] = new Array;//para exportar pdf
  compSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private roomTypeService: RoomTypeService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.roomTypeService.getRoomTypes().subscribe(
      roomType => this.roomTypes = roomType
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase
    this.cols = [
      { field: "id", header: 'Identificador' },
      { field: "name", header: 'Nombre' },
      { field: "numMaxGuests", header: 'Huespedes permitidos' }
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Identificador', 'Nombre', 'Huespedes permitidos']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Tipo de habitación' },
      { label: 'Tipos de habitaciones registradas' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //eliminar tipo de habitación
  delete(id: number) {
    var nameRoomType: string = "";

    for (var i = 0; i < this.roomTypes.length; i++) {
      if (this.roomTypes[i].id == id) {
        nameRoomType = this.roomTypes[i].name;
      }
    }



    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar el tipo de habitación ' + nameRoomType + ' ?',
      header: 'Confirmación para eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Aprobado', detail: 'Tipo de habitación eliminado correctamente', life: 3000 });
        this.roomTypeService.deleteRoomType(id).subscribe(
          emp => {
            this.roomTypeService.getRoomTypes().subscribe(
              response => this.roomTypes = response
            )

          }

        );
      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Se ha cancelado la operación.', life: 3000 });
        this.roomTypeService.getRoomTypes()
      }
    });
  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.roomTypes.length; i++) {
      let rType1 = [
        this.roomTypes[i].id,
        this.roomTypes[i].name,
        this.roomTypes[i].numMaxGuests
      ];
      this.dataTable.push(rType1);
    }
    return this.dataTable;
  }


  //exportar datos como pdf
  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Lista de Tipos de habitación', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('tipos-de-habitacion.pdf');
  }


  /**
   * añadir todos los tipos de habitacion a una lista json
   * @returns json con todos los tipos de habitacion
   */
  listRoomTypesJson() {
    for (var i = 0; i < this.roomTypes.length; i++) {
      this.rtype.push({
        Identificador: this.roomTypes[i].id,
        Nombre: this.roomTypes[i].name,
        CapacidadMaxima: this.roomTypes[i].numMaxGuests
      });
    }
    return this.rtype;
  }


  //función para exportar en archivo de excel .xls
  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.listRoomTypesJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Tipos-Habitacion");
    });
  }

  //función que guarda el archivo con los datos que llegan de la función anterior
  saveAsExcelFile(buffer: any, fileName: string): void {


    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }

}
