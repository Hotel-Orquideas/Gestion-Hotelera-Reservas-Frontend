import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethod } from '../list-payment-methods/paymentMethod';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethodService } from 'src/app/services/payment-method-service/payment-method.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-register-payment-method',
  templateUrl: './register-payment-method.component.html',
  styleUrls: ['./register-payment-method.component.css']
})
export class RegisterPaymentMethodComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar

  paymentMethod: PaymentMethod = new PaymentMethod();
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar tipo de habitación
  home: MenuItem = {};//para breadcrumb

  constructor(private paymentMethodService: PaymentMethodService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    //validaciones básicas para el formulario de registrar
    this.formRegister = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]]
    });

    this.cargar(); //llena el formulario si existe id en el parametro url

    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Métodos de pago' },
      { label: 'Registrar método de pago' }
    ];

    //etiquetas para el breadcrumb cuando es actualziar servicio
    this.itemsElse = [
      { label: 'Método de pago' },
      { label: 'Métodos de pago registrados', url: 'paymentMethods/list-payment-methods' },
      { label: 'Actualizar metodo de pago' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  cargar(): void {

    this.activatedRoute.params.subscribe(
      rtype => {
        let id = rtype['id'];
        if (id) {
          this.paymentMethodService.getPaymentMethod(id).subscribe(
            rt => this.paymentMethod = rt
          );

        }
      }
    );

  }

  register(): void {


    this.paymentMethodService.registerPaymentMethod(this.paymentMethod).subscribe(
      res => {
        this.toastr.success('El método de pago se ha registrado satisfactoriamente.', 'Registro metodo de pago', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/paymentMethod/list-payment-methods'])
      }
    );
  }

  update(): void {
    this.paymentMethodService.updatePaymentMethod(this.paymentMethod).subscribe(
      emp => {
        this.toastr.info('El metodo de pago se ha actualizado satisfactoriamente.', 'Actualziar método de pago', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/paymentMethod/list-payment-methods'])
      }
    );
  }

}
