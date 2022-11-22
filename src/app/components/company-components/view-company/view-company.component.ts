import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { Company } from '../list-companies/company';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Client } from '../../client-components/list-clients/client';
import { ClientCompanyService } from 'src/app/services/clientCompany-service/client-company.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {

  onLoad:boolean = false;
  company: Company;
  clients:Client[] = new Array;
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private clientCompanyService:ClientCompanyService,private companyService: CompanyService, private activatedRoute: ActivatedRoute, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

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

  loadClientsCompany():void{
    this.onLoad=true;
    console.log("id de la empresa: "+ this.company.id)
    this.clientCompanyService.getClients(this.company.id).subscribe(
      cl=> {
        console.log(cl);
        this.clients=cl;}
    );

    console.log(this.clients[0]);

  }

}
