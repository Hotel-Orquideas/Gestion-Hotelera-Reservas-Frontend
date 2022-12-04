import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentHistory } from './paymentHistory';
import { PaymentHistoryService } from 'src/app/services/bill-service/payment-history.service';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';

@Component({
  selector: 'app-list-payments-history',
  templateUrl: './list-payments-history.component.html',
  styleUrls: ['./list-payments-history.component.css']
})
export class ListPaymentsHistoryComponent implements OnInit {

  paymentsHistory: PaymentHistory[] = new Array;
  ph = new Array(); //para poder exportar en excel
  cols: any[] = new Array;
  headSimple: any[] = new Array;//para exportar pdf
  empSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private paymentHistoryService: PaymentHistoryService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      response => {
        let id = response['idBill'];
        if (id) {
          this.paymentHistoryService.getPaymentsHistory(id).subscribe(
            paymentHistory => this.paymentsHistory = paymentHistory
          );

        }
      }
    );

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase
    this.cols = [
      { field: "paymentMethod.name", header: 'Método de pago' },
      { field: "valueToPay", header: 'Valor pagado' },
      { field: "dateOfPay", header: 'Fecha del pago' },
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Método de pago', 'Valor pagado', 'Fecha del pago']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Pagos' },
      { label: 'Listar Facturas', url: 'bill/list-bills' },
      { label: 'Historial de pagos' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/home' };

  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.paymentsHistory.length; i++) {
      let ph = [
        this.paymentsHistory[i].paymentMethod.name,
        this.paymentsHistory[i].valueToPay,
        this.paymentsHistory[i].dateOfPay
      ];
      this.dataTable.push(ph);
    }
    return this.dataTable;
  }



  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Historial de pagos de factura', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('historial-pagos-factura.pdf');
  }


  /**
   * añadir todos los pagos de la factura a una lista json
   * @returns json con todas las facturas
   */
  listPaymentsHistoryJson() {
    for (var i = 0; i < this.paymentsHistory.length; i++) {
      this.ph.push({
        MetodoPago: this.paymentsHistory[i].paymentMethod.name,
        ValorPagado: this.paymentsHistory[i].valueToPay,
        Fecha: this.paymentsHistory[i].dateOfPay
      });
    }
    return this.ph;
  }


  exportExcel() {
    import("xlsx").then(xlsx => {

      const worksheet = xlsx.utils.json_to_sheet(this.listPaymentsHistoryJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "historial-pagos-factura");
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
