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

  constructor(private clientCompanyService: ClientCompanyService, private clientService: ClientService, private companyService: CompanyService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true

    //validaciones básicas para el formulario de registrar
    this.formRegister = this.formBuilder.group({
      companyId: ['', [Validators.required]],
      clientId: ['', [Validators.required]]
    });

    //traemos todas las empresas
    this.companyService.getCompanies().subscribe(
      comp => this.companies = comp
    );

    //traemos todos los clientes
    this.clientService.getClients().subscribe(
      cli => this.clients = cli
    );

    this.cargar(); //llena el formulario si existe id en el parametro url


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Cliente en Empresa' },
      { label: 'Registrar Cliente a empresa' }
    ];

    //etiquetas para el breadcrumb cuando es actualziar servicio
    this.itemsElse = [
      { label: 'Cliente en Empresa' },
      { label: 'pendiente' },
      { label: 'Actualizar Cliente a empresa' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //comprobar que existe al menos una empresa para poder dejar ingresar a agregar
  existsCompanies() {

    if (this.companies.length >= 1) {
    } else {
      this.toastr.error('Error, no hay empresas registradas, registre una y vuelva a intentar.', 'Error', {
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['/home']);
    }

  }

  //comprobar que existe al menos una empresa para poder dejar ingresar a agregar
  existsClients() {

    if (this.clients.length >= 1) {
    } else {
      this.toastr.error('Error, no hay clientes registrados, registre uno y vuelva a intentar.', 'Error', {
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['/home']);
    }

  }

  cargar(): void {

    this.activatedRoute.params.subscribe(
      clcom => {
        let id = clcom['clientId'];
        if (id) {
          //pendiente
          /*
          this.clientCompanyService.getPromotion(id).subscribe(
            prom => this.promotion = prom
          );
          */

        }
      }
    );

  }

  register(): void {


    this.clientCompanyService.registerClientCompany(this.clientCompany).subscribe(
      res => {
        this.toastr.success('El cliente se ha registrado correctamente a la empresa.', 'Registro Cliente en empresa', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/home'])
      },
      error=>{

        this.toastr.error('Ha ocurrido un error. '+error.status , 'Registro Cliente en empresa', {
          closeButton: true,
          progressBar: true
        });
        
      }
    );
  }

}
