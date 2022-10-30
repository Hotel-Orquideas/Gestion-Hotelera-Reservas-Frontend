import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rate } from './rate';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import { MenuItem } from 'primeng/api';
import { RateService } from 'src/app/services/rate-service/rate.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-list-rates',
  templateUrl: './list-rates.component.html',
  styleUrls: ['./list-rates.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListRatesComponent implements OnInit {

  rates: Rate[] = new Array;
  rt = new Array(); //para poder exportar en excel
  cols: any[] = new Array;//para exportar en CSV
  headSimple: any[] = new Array;//para exportar pdf
  compSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private rateService: RateService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    this.rateService.getRates().subscribe(
      rate => this.rates = rate
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase
    this.cols = [
      { field: "id", header: 'Identificador' },
      { field: "name", header: 'Nombre' },
      { field: "value", header: 'Valor Tarifa' },
      { field: "roomType.name", header: 'Tipo de habitación' }
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Identificador', 'Nombre', 'Valor Tarifa', 'Tipo de habitación']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Tarifa' },
      { label: 'Tarifas registradas' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //eliminar tarifa
  delete(id: number) {
    var nameRate: string = "";

    for (var i = 0; i < this.rates.length; i++) {
      if (this.rates[i].id == id) {
        nameRate = this.rates[i].name;
      }
    }



    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar la tarifaón ' + nameRate + ' ?',
      header: 'Confirmación para eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Aprobado', detail: 'Tarifa eliminada correctamente', life: 3000 });
        this.rateService.deleteRate(id).subscribe(
          emp => {
            this.rateService.getRates().subscribe(
              response => this.rates = response
            )

          }

        );
      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Se ha cancelado la operación.', life: 3000 });
        this.rateService.getRates()
      }
    });
  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.rates.length; i++) {
      let rate1 = [
        this.rates[i].id,
        this.rates[i].name,
        this.rates[i].value,
        this.rates[i].roomType.name
      ];
      this.dataTable.push(rate1);
    }
    return this.dataTable;
  }

  //exportar datos como pdf
  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Lista de Tarifas', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('tarifas.pdf');
  }


  /**
   * añadir todos los tipos de habitacion a una lista json
   * @returns json con todos los tipos de habitacion
   */
  listRoomTypesJson() {
    for (var i = 0; i < this.rates.length; i++) {
      this.rt.push({
        Identificador: this.rates[i].id,
        Nombre: this.rates[i].name,
        Valor: this.rates[i].value,
        TipoHabitacion: this.rates[i].roomType.name
      });
    }
    return this.rt;
  }


  //función para exportar en archivo de excel .xls
  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.listRoomTypesJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Tarifas");
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
