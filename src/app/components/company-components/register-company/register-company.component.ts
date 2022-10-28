import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../list-companies/company';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company-service/company.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar

  company: Company = new Company();
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar empleado
  home: MenuItem = {};//para breadcrumb

  constructor(private companyService: CompanyService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {

        //validaciones básicas para el formulario de registrar
        this.formRegister= this.formBuilder.group({
          nit:['', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(15)
          ]],
          name:['', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15)
          ]],
          legalAgent:['', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30)
          ]],
          phoneNumber:['', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(15)
          ]],
          email:['', [
            Validators.required,
            Validators.email
          ]]
        });

    this.cargar(); //llena el formulario si existe NIT en el parametro url

    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Empresa' },
      { label: 'Registrar empresa' }
    ];

    //etiquetas para el breadcrumb cuando es actualziar empleado
    this.itemsElse = [
      { label: 'Empresa' },
      { label: 'Actualizar empresa' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  cargar(): void {
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

  }

  register(): void {

    
    this.companyService.registerCompany(this.company).subscribe(
      res => {
        this.toastr.success('La empresa se ha registrado satisfactoriamente.', 'Registro empresa',{
          closeButton:true,
          progressBar:true
        });
        this.router.navigate(['/company/list-companies'])}
    );
  }

  update(): void {
    this.companyService.updateCompany(this.company).subscribe(
      emp => {
        this.toastr.info('La empresa se ha actualizado satisfactoriamente.', 'Actualziar empresa', {
          closeButton:true,
          progressBar:true
        });
        this.router.navigate(['/company/list-companies'])}
    );
  }


}
