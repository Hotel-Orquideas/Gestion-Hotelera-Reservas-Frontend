import { Component, OnInit } from '@angular/core';
import { Bill } from './bill';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import { BillService } from 'src/app/services/bill-service/bill.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PaymentMethod } from '../../payment-method-components/list-payment-methods/paymentMethod';
import { PaymentMethodService } from 'src/app/services/payment-method-service/payment-method.service';

@Component({
  selector: 'app-list-bills',
  templateUrl: './list-bills.component.html',
  styleUrls: ['./list-bills.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListBillsComponent implements OnInit {

  paymentMethods:PaymentMethod[]=new Array;//para contar cuantos metodos de pago existen
  bills: Bill[] = new Array;
  bl = new Array(); //para poder exportar en excel
  cols: any[] = new Array;
  headSimple: any[] = new Array;//para exportar pdf
  empSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private paymentMethodService:PaymentMethodService,private billService: BillService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    this.billService.getBills().subscribe(
      bill => this.bills = bill
    );

    //para obtener todos los metodos de pago
    this.paymentMethodService.getPaymentMethods().subscribe(
      paymentMethod => this.paymentMethods = paymentMethod
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase booking.dato
    this.cols = [
      { field: "id", header: 'Representante' },
      { field: "date", header: 'Fecha' },
      { field: "balanceDue", header: 'Saldo Pendiente' },
      { field: "total", header: 'Total' },
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Representante', 'Fecha', 'Saldo Pendiente', 'Total']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Pagos' },
      { label: 'Listar Facturas' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/home' };

  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.bills.length; i++) {
      let bl = [
        this.bills[i].id,
        this.bills[i].date,
        this.bills[i].balanceDue,
        this.bills[i].total

      ];
      this.dataTable.push(bl);
    }
    return this.dataTable;
  }



  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Lista de facturas', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('facturas.pdf');
  }


  /**
   * añadir todas las facturas a una lista json
   * @returns json con todas las facturas
   */
  listBillsJson() {
    for (var i = 0; i < this.bills.length; i++) {
      this.bl.push({
        Representante: this.bills[i].id,
        Fecha: this.bills[i].date,
        Saldo: this.bills[i].balanceDue,
        Total: this.bills[i].total,
      });
    }
    return this.bl;
  }


  exportExcel() {
    import("xlsx").then(xlsx => {

      const worksheet = xlsx.utils.json_to_sheet(this.listBillsJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "facturas");
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

  //para verificar que exista al menos un método de pago registrado y poder hacer un pago, sino no deja ingresar
  existsPaymentMethods(idBill:number){

    if(this.paymentMethods.length==0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay métodos de pago registrados, ingrese uno y vuelva a intentar.', life: 3000 });
    }else{
      this.router.navigate(['/bill/register-payment-history',idBill])
    }
  }

}
