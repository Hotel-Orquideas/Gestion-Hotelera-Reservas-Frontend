import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { Bill } from '../list-bills/bill';
import { BillService } from 'src/app/services/bill-service/bill.service';
import { PaymentHistory } from '../list-payments-history/paymentHistory';
import { PaymentHistoryService } from 'src/app/services/bill-service/payment-history.service';
import { PaymentMethod } from '../../payment-method-components/list-payment-methods/paymentMethod';
import { PaymentMethodService } from 'src/app/services/payment-method-service/payment-method.service';

@Component({
  selector: 'app-register-payment-history',
  templateUrl: './register-payment-history.component.html',
  styleUrls: ['./register-payment-history.component.css']
})
export class RegisterPaymentHistoryComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar

  bill: Bill = new Bill;
  paymentHistory: PaymentHistory = new PaymentHistory;
  paymentMethods: PaymentMethod[] = new Array();
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar servicio
  home: MenuItem = {};//para breadcrumb

  constructor(private paymentMethodService: PaymentMethodService, private billService: BillService, private paymentHistoryService: PaymentHistoryService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true

    //validaciones básicas para el formulario de registrar
    this.formRegister = this.formBuilder.group({
      paymentMethod: ['', [
        Validators.required
      ]],
      valueToPay: ['', [
        Validators.required
      ]]
    });

    //traemos todos los metodos de pago
    this.paymentMethodService.getPaymentMethods().subscribe(
      payment => this.paymentMethods = payment
    );

    this.activatedRoute.params.subscribe(
      rat => {
        let id = rat['idBill'];
        if (id) {
          this.billService.getBill(id).subscribe(
            bl => this.bill = bl
          );

        }
      }
    );

    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Pagos' },
      { label: 'Listar Facturas', url: 'bill/list-bills' },
      { label: 'Registrar pago' }
    ];


    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/home' };

  }

  register(): void {


    this.paymentHistoryService.registerPaymentHistory(this.paymentHistory, this.bill.id).subscribe(
      res => {
        this.toastr.success('El pago se ha registrado satisfactoriamente.', 'Registro de pago', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/bill/list-bills'])
      }
    );
  }
  prueba(){
    this.bill.balanceDue=50000;
  }

}
