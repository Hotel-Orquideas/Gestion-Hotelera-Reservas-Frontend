import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillDetails } from './billDetails';
import { BillDetailService } from 'src/app/services/bill-service/bill-detail.service';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';


@Component({
  selector: 'app-list-bills-details',
  templateUrl: './list-bills-details.component.html',
  styleUrls: ['./list-bills-details.component.css']
})
export class ListBillsDetailsComponent implements OnInit {

  billDetails: BillDetails[] = new Array;
  bd = new Array(); //para poder exportar en excel
  cols: any[] = new Array;
  headSimple: any[] = new Array;//para exportar pdf
  empSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private billDetailService: BillDetailService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      response => {
        let id = response['idBill'];
        if (id) {
          this.billDetailService.getBillDetails(id).subscribe(
            detail => this.billDetails = detail
          );

        }
      }
    );

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase
    this.cols = [
      { field: "description", header: 'Descripción' },
      { field: "date", header: 'Fecha' },
      { field: "price", header: 'Total' },
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Descripción', 'Fecha', 'Total']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Pagos' },
      { label: 'Listar Facturas', url: 'bill/list-bills' },
      { label: 'Detalles de Factura' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/home' };

  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.billDetails.length; i++) {
      let bd = [
        this.billDetails[i].description,
        this.billDetails[i].date,
        this.billDetails[i].price,
      ];
      this.dataTable.push(bd);
    }
    return this.dataTable;
  }



  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Detalles de factura', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('detalle-factura.pdf');
  }


  /**
   * añadir todos los detalles de la factura a una lista json
   * @returns json con todas las facturas
   */
  listBillDetailsJson() {
    for (var i = 0; i < this.billDetails.length; i++) {
      this.bd.push({
        Descripcion: this.billDetails[i].description,
        Fecha: this.billDetails[i].date,
        Total: this.billDetails[i].price
      });
    }
    return this.bd;
  }


  exportExcel() {
    import("xlsx").then(xlsx => {

      const worksheet = xlsx.utils.json_to_sheet(this.listBillDetailsJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "detalle-factura");
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
