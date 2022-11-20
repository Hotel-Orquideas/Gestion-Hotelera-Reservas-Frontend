import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Promotion } from './promotion';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable';
import { MenuItem } from 'primeng/api';
import { PromotionService } from 'src/app/services/promotion-service/promotion.service';
import { PrimeNGConfig } from 'primeng/api';
import { Company } from '../../company-components/list-companies/company';
import { CompanyService } from 'src/app/services/company-service/company.service';

@Component({
  selector: 'app-list-promotions',
  templateUrl: './list-promotions.component.html',
  styleUrls: ['./list-promotions.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListPromotionsComponent implements OnInit {


  promotions: Promotion[] = new Array;
  companies: Company[] = new Array();
  comp:Company;
  promo = new Array(); //para poder exportar en excel
  cols: any[] = new Array;//para exportar en CSV
  headSimple: any[] = new Array;//para exportar pdf
  compSimple: any[] = new Array;//para exportar pdf
  dataTable: any[] = new Array;//para exportar pdf
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private promotionService: PromotionService, private companyService: CompanyService ,private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para saber si hay al menos un tipo de habitación
    this.companyService.getCompanies().subscribe(
      company => this.companies = company
    );

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    this.promotionService.getPromotions().subscribe(
      promotion => this.promotions = promotion
    );

    //este cols se usa para poder exportar en csv, por eso en field está como sale para obtener el dato de la clase
    this.cols = [
      { field: "description", header: 'Descripción' },
      { field: "percentage", header: 'Descuento' },
      { field: "company.name", header: 'Empresa' },
      { field: "expirationDate", header: 'Fecha Expiracion' },
    ];

    //este lo uso para crear las cabeceras de la tabla para exportar en pdf
    this.headSimple = [['Descripcion', 'Valor Descuento', 'Nombre Empresa','Fecha expiración']]


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Promoción' },
      { label: 'Promociones registradas' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };


  }

  //eliminar promoción
  delete(id: number) {
    var percentage: number = 0;

    for (var i = 0; i < this.promotions.length; i++) {
      if (this.promotions[i].id == id) {
        percentage = this.promotions[i].percentage;
      }
    }



    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar la promoción con descuento de ' + percentage + '% ?',
      header: 'Confirmación para eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Aprobado', detail: 'Promoción eliminada correctamente', life: 3000 });
        this.promotionService.deletePromotion(id).subscribe(
          emp => {
            this.promotionService.getPromotions().subscribe(
              response => this.promotions = response
            )

          }

        );
      }, reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Se ha cancelado la operación.', life: 3000 });
        this.promotionService.getPromotions()
      }
    });
  }

  //comprobar que existe al menos una empresa para poder dejar ingresar a agregar
  existsCompanies(){
   
    if(this.companies.length>=1){
      this.router.navigate(['/promotion/register-promotion']);
    }else{
      this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'No hay empresas registradas, registre una y proceda nuevamente.', life: 3000 });
    }

  }

  //se genera la lista para añadir los datos a la tabla
  listDataTable() {
    for (var i = 0; i < this.promotions.length; i++) {
      let promotion1 = [
        this.promotions[i].description,
        this.promotions[i].percentage,
        this.nameCompany(this.promotions[i].companyId),
        this.promotions[i].expirationDate
      ];
      this.dataTable.push(promotion1);
    }
    return this.dataTable;
  }

  //exportar datos como pdf
  exportPdf() {
    var doc = new jspdf.jsPDF();

    doc.setFontSize(14);
    doc.text('Lista de promociones', 11, 8);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.headSimple,
      body: this.listDataTable(),
      styles: {
        fontSize: 6
      }
    })
    doc.save('promociones.pdf');
  }


  /**
   * añadir todas las promociones a una lista json
   * @returns json con todas las promociones
   */
  listPromotionJson() {
    for (var i = 0; i < this.promotions.length; i++) {
      this.promo.push({
        Descripcion: this.promotions[i].description,
        Descuento: this.promotions[i].percentage,
        Empresa: this.nameCompany(this.promotions[i].companyId),
        Expiracion:this.promotions[i].expirationDate
      });
    }
    return this.promo;
  }


  //función para exportar en archivo de excel .xls
  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.listPromotionJson());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Promociones");
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

  nameCompany(id:number):string{
    let name:string="";
    for (var i = 0; i < this.companies.length; i++) {
      if(this.companies[i].id==id){
        name=this.companies[i].name;
      }
    }


    return name;
  }

}
