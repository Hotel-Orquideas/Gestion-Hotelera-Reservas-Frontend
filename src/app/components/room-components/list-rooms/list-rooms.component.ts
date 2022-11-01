import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room-service/room.service';
import { Router } from '@angular/router';
import { Room } from './room';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import { FormArrayName } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { RoomType } from '../../roomType-components/list-room-types/roomType';
import { ArrayType } from '@angular/compiler';
import { RoomTypeService } from 'src/app/services/roomType-service/room-type.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Rate } from '../../rate-components/list-rates/rate';
import { RateService } from 'src/app/services/rate-service/rate.service';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css'],
  providers: [MessageService, ConfirmationService],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class ListRoomsComponent implements OnInit {

  rooms: Room[] = new Array;
  rates: Rate[] = new Array;
  roomTypes: RoomType[] = new Array(); // para traer todos los tipos de habitaciones
  rm = new Array(); //para poder exportar en excel
  cols: any[] = new Array;
  headSimple: any[] = new Array;//para exportar pdf
  empSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private roomService: RoomService, private roomTypeService: RoomTypeService, private rateService: RateService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para saber si hay al menos un tipo de habitación
    this.roomTypeService.getRoomTypes().subscribe(
      roomType => this.roomTypes = roomType
    );

    //traer todas las tarifas
    this.rateService.getRates().subscribe(
      rate => this.rates = rate
    );

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    this.roomService.getRooms().subscribe(
      room => this.rooms = room
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase employee.person.dato
    this.cols = [
      { field: "number", header: 'Número' },
      { field: "state", header: 'Estado' },
      { field: "roomTypeId", header: 'Tipo de habitación' },
      { field: "rateId", header: 'Tarifa' },
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Número', 'Estado', 'Tipo habitación', 'Tarifa']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Habitación' },
      { label: 'Habitaciones registradas' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //función para eliminar el empleado
  delete(id: number) {
    var nameRoom: string = "";

    for (var i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id == id) {
        nameRoom = this.rooms[i].number;
      }
    }



    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar la habitación ' + nameRoom + '?',
      header: 'Confirmación para eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Aprobado', detail: 'Habitación eliminada correctamente', life: 3000 });
        this.roomService.deleteRoom(id).subscribe(
          emp => {
            this.roomService.getRooms().subscribe(
              response => this.rooms = response
            )

          }

        );
      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Se ha cancelado la operación.', life: 3000 });
        this.roomService.getRooms()
      }
    });
  }

  //comprobar que existe al menos un tipo de habitación para poder dejar ingresar a agregar
  existsRoomTypes() {

    if (this.roomTypes.length >= 1) {
      this.router.navigate(['/room/register-room']);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'No hay tipos de habitación registrados, registre uno y proceda nuevamente.', life: 3000 });
    }

  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.rooms.length; i++) {
      let r1 = [
        this.rooms[i].number,
        this.rooms[i].state,
        this.rooms[i].roomTypeId,

      ];
      this.dataTable.push(r1);
    }
    return this.dataTable;
  }



  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Lista de Habitaciones', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('habitaciones.pdf');
  }


  /**
   * añadir todos las habitaciones a una lista json
   * @returns json con todos los empelados
   */
  listRoomsJson() {
    for (var i = 0; i < this.rooms.length; i++) {
      this.rm.push({
        Número: this.rooms[i].number,
        Estado: this.rooms[i].state,
        TipoHabitacion: this.rooms[i].roomTypeId,
      });
    }
    return this.rm;
  }


  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.listRoomsJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Habitaciones");
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
  textInBadge(status: string): string {

    if (status == "A") {
      return "Activo"
    } else if (status == "O") {
      return "Ocupada"
    } else {
      return "Sin estado - error"
    }

  }


  //función para color del badge
  colorInBadge(status: string): string {

    if (status == "A") {
      return "success"
    } else if (status == "O") {
      return "warning"
    } else {
      return "danger"
    }

  }

  //obtener el nombre de un tipo de habitación
  nameRoomType(id: number): string {
    let nameRoomType: string;
    for (let i = 0; i < this.roomTypes.length; i++) {

      if (this.roomTypes[i].id === id) {
        nameRoomType = this.roomTypes[i].name;
      }

    }

    return nameRoomType

  }

  fnPrueba(): any[]{
    const prueba=[
      {
        "rates":[
          {
            "value":300
          },
          {
            "value":400
          }
        ]
      },
      {
        "rates":[
          {
            "value":100
          },
          {
            "value":200
          }
        ]
      },
      {
        "rates":[
          {
            "value":800
          },
          {
            "value":900
          }
        ]
      }
    ];
    return prueba;
  }



}
