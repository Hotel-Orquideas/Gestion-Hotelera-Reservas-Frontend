import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethod } from './paymentMethod';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import { MenuItem } from 'primeng/api';
import { PaymentMethodService } from 'src/app/services/payment-method-service/payment-method.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-list-payment-methods',
  templateUrl: './list-payment-methods.component.html',
  styleUrls: ['./list-payment-methods.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListPaymentMethodsComponent implements OnInit {

  paymentMethods: PaymentMethod[] = new Array;
  pmethod = new Array(); //para poder exportar en excel
  cols: any[] = new Array;//para exportar en CSV
  headSimple: any[] = new Array;//para exportar pdf
  compSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private paymentMethodService: PaymentMethodService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    this.paymentMethodService.getPaymentMethods().subscribe(
      paymethod => this.paymentMethods = paymethod
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase
    this.cols = [
      { field: "id", header: 'Identificador' },
      { field: "name", header: 'Nombre' }
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Identificador', 'Nombre']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Métodos de pago' },
      { label: 'Métodos de pago registradas' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //eliminar tipo de habitación
  delete(id: number) {
    var namePaymentMethod: string = "";

    for (var i = 0; i < this.paymentMethods.length; i++) {
      if (this.paymentMethods[i].id == id) {
        namePaymentMethod = this.paymentMethods[i].name;
      }
    }



    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar el método de pago ' + namePaymentMethod + ' ?',
      header: 'Confirmación para eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.paymentMethodService.deletePaymentMethod(id).subscribe(
          emp => {
            this.paymentMethodService.getPaymentMethods().subscribe(
              response => this.paymentMethods = response
            )
            this.messageService.add({ severity: 'success', summary: 'Aprobado', detail: 'Método de pago eliminado correctamente', life: 3000 });
          },
          error => {
            //mejorar este mensaje - mostrando las tarifas y habitaciones que dependen de este
            this.messageService.add({
              severity: 'error', summary: 'Error al eliminar',
              detail: "No es posible eliminar este tipo de habitación debido a que hay tarifas y tipos de habitación que dependen de esta, elimine/edite primero las tarifas y habitaciones y vuelva a intentar",
              life: 3000
            })
          }

        );



      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Se ha cancelado la operación.', life: 3000 });
        this.paymentMethodService.getPaymentMethods()
      }
    });
  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.paymentMethods.length; i++) {
      let rType1 = [
        this.paymentMethods[i].id,
        this.paymentMethods[i].name,
      ];
      this.dataTable.push(rType1);
    }
    return this.dataTable;
  }


  //exportar datos como pdf
  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Lista de métodos de pago', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('metodos-de-pago.pdf');
  }


  /**
   * añadir todos los tipos de habitacion a una lista json
   * @returns json con todos los tipos de habitacion
   */
  listPaymentMethodsJson() {
    for (var i = 0; i < this.paymentMethods.length; i++) {
      this.pmethod.push({
        Identificador: this.paymentMethods[i].id,
        Nombre: this.paymentMethods[i].name
      });
    }
    return this.pmethod;
  }


  //función para exportar en archivo de excel .xls
  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.listPaymentMethodsJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "metodos-pago");
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
