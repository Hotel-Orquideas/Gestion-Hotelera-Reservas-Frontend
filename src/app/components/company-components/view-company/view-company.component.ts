import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { Company } from '../list-companies/company';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {

  company: Company;
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private companyService: CompanyService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(

      emp => {
        let nit = emp['nit'];
        if (nit) {
          this.companyService.getCompany(nit).subscribe(
            es => this.company = es
          );

        }
      }
    );


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Empresa' },
      { label: 'Empresas registradas', url: 'company/list-companies' },
      { label: 'Visualizar empresa' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}
