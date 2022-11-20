import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Promotion } from '../list-promotions/promotion';
import { Company } from '../../company-components/list-companies/company';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { PromotionService } from 'src/app/services/promotion-service/promotion.service';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-register-promotion',
  templateUrl: './register-promotion.component.html',
  styleUrls: ['./register-promotion.component.css']
})
export class RegisterPromotionComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar

  promotion: Promotion = new Promotion();
  companies: Company[] = new Array();
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar servicio
  home: MenuItem = {};//para breadcrumb
  minDate: Date = new Date;
  maxDate: Date = new Date;


  constructor(private promotionService: PromotionService, private companyService: CompanyService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true

    //validaciones básicas para el formulario de registrar
    this.formRegister = this.formBuilder.group({
      description: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60)
      ]],
      percentage: ['', [
        Validators.required,
      ]],
      expirationDate: ['', [
        Validators.required,
      ]],
      companyId: ['']
    });

    //traemos todas las empresas
    this.companyService.getCompanies().subscribe(
      rt => this.companies = rt
    );

    this.cargar(); //llena el formulario si existe id en el parametro url

    //condiciones fecha a partir de hoy y máximo un año de validez
    this.minDate.setFullYear(new Date().getFullYear());
    this.maxDate.setFullYear(new Date().getFullYear() + 1);

    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Promoción' },
      { label: 'Registrar promoción' }
    ];

    //etiquetas para el breadcrumb cuando es actualziar servicio
    this.itemsElse = [
      { label: 'Promoción' },
      { label: 'Promociones registradas', url: 'promotion/list-promotions' },
      { label: 'Actualizar promoción' }
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
      this.router.navigate(['/promotion/list-promotions']);
    }

  }

  cargar(): void {

    this.activatedRoute.params.subscribe(
      promo => {
        let id = promo['id'];
        if (id) {
          this.promotionService.getPromotion(id).subscribe(
            prom => this.promotion = prom
          );

        }
      }
    );

  }

  register(): void {


    this.promotionService.registerPromotion(this.promotion).subscribe(
      res => {
        this.toastr.success('La promoción se ha registrado satisfactoriamente.', 'Registro promoción', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/promotion/list-promotions'])
      }
    );
  }

  update(): void {

    this.promotionService.updatePromotion(this.promotion).subscribe(
      emp => {
        this.toastr.info('La promoción se ha actualizado satisfactoriamente.', 'Actualziar promoción', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/promotion/list-promotions'])
      }
    );
  }

}
