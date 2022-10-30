import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { Router } from '@angular/router';
import { Company } from './company';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListCompaniesComponent implements OnInit {

  companies: Company[] = new Array;
  comps = new Array(); //para poder exportar en excel
  cols: any[] = new Array;//para exportar en CSV
  headSimple: any[] = new Array;//para exportar pdf
  compSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private companyService: CompanyService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    this.companyService.getCompanies().subscribe(
      company => this.companies = company
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase
    this.cols = [
      { field: "name", header: 'Nombre' },
      { field: "nit", header: 'Nit' },
      { field: "email", header: 'Correo' },
      { field: "phoneNumber", header: 'Telefono' },
      { field: "legalAgent", header: 'Representante' }
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Nit', 'Nombre', 'Representante', 'Correo', 'Telefono']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Empresa' },
      { label: 'Empresas registradas' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //eliminar empresa
  delete(nit: string) {
    var nameCompany: string = "";
    var companySelect: Company;
    for (var i = 0; i < this.companies.length; i++) {
      if (this.companies[i].nit == nit) {
        companySelect = this.companies[i]
        nameCompany = this.companies[i].name;
      }
    }



    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar a la empresa ' + nameCompany + ' ?',
      header: 'Confirmación para eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Aprobado', detail: 'Empresa eliminada correctamente', life: 3000 });
        this.companyService.deleteCompany(companySelect).subscribe(
          emp => {
            this.companyService.getCompanies().subscribe(
              response => this.companies = response
            )

          }

        );
      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Se ha cancelado la operación.', life: 3000 });
        this.companyService.getCompanies()
      }
    });
  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.companies.length; i++) {
      let comp1 = [
        this.companies[i].nit,
        this.companies[i].name,
        this.companies[i].legalAgent,
        this.companies[i].email,
        this.companies[i].phoneNumber
      ];
      this.dataTable.push(comp1);
    }
    return this.dataTable;
  }


  //exportar datos como pdf
  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Lista de Empresas', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('empresas.pdf');
  }


  /**
   * añadir todas las empresas a una lista json
   * @returns json con todas las empresas
   */
  listCompaniesJson() {
    for (var i = 0; i < this.companies.length; i++) {
      this.comps.push({
        Nombre: this.companies[i].name,
        Nit: this.companies[i].nit,
        Correo: this.companies[i].email,
        Telefono: this.companies[i].phoneNumber,
        Representante: this.companies[i].legalAgent
      });
    }
    return this.comps;
  }


  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.listCompaniesJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "empresas");
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
