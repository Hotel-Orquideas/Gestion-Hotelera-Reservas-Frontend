import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCompany } from '../clientCompany';
import { Company } from '../../company-components/list-companies/company';
import { Client } from '../../client-components/list-clients/client';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { ClientService } from 'src/app/services/client-service/client.service';
import { ClientCompanyService } from 'src/app/services/clientCompany-service/client-company.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-register-client-company',
  templateUrl: './register-client-company.component.html',
  styleUrls: ['./register-client-company.component.css']
})
export class RegisterClientCompanyComponent implements OnInit {


  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar

  clientCompany: ClientCompany = new ClientCompany;
  client: Client = new Client();
  clients: Client[] = new Array();
  company: Company = new Company;
  companies: Company[] = new Array();
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar servicio
  home: MenuItem = {};//para breadcrumb

  constructor(private clientCompanyService:ClientCompanyService,private clientService: ClientService, private companyService: CompanyService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
  }

}
