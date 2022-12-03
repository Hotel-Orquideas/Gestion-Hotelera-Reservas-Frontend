import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client-service/client.service';
import { Client } from '../list-clients/client';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar


  client: Client = new Client();
  documentTypes: any = new Array;//para option
  genres: any = new Array;//para option
  rhs: any = new Array;//para option
  minDate: Date = new Date;
  maxDate: Date = new Date;
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar cliente
  itemsElseIf: MenuItem[] = new Array;//para breadcrumb cuando es actualizar cliente y hay reserva
  home: MenuItem = {};//para breadcrumb
  reservation: any;
  id: any;

  constructor(private clientService: ClientService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {


    this.cargar(); //llena el formulario si existe documento en el parametro url

    //validaciones básicas para el formulario de registrar
    this.formRegister = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]],
      documentType: ['', [
        Validators.required,
      ]],
      document: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(11)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15)
      ]],
      country_origin: ['', [
        Validators.required
      ]],
      city_origin: ['', [
        Validators.required
      ]],
      country_destination: ['', [
        Validators.required
      ]],
      city_destination: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      genre: ['', [
        Validators.required
      ]],
      bloodType: ['', [
        Validators.required
      ]],
      profession: ['', [
        Validators.required
      ]],
      birthdate: ['', [
      ]],
      dateIssuanceDoc: ['', [
        Validators.required
      ]]
    });

    


    //condiciones fecha, no hay mayores a 120 años y la fecha de expedición de cedula pudo ser hoy.
    this.minDate.setFullYear(new Date().getFullYear() - 120);
    this.maxDate.setFullYear(new Date().getFullYear() - 0);


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Cliente' },
      { label: 'Registrar cliente' }
    ];

    //etiquetas para el breadcrumb cuando es actualziar empleado
    this.itemsElse = [
      { label: 'Cliente' },
      { label: 'Clientes registrados', url: 'client/list-clients' },
      { label: 'Actualizar cliente' }
    ];

    //etiquetas para el breadcrumb cuando es actualziar empleado con una reserva activa
    this.itemsElseIf = [
      { label: 'Check-in' },
      { label: 'Clientes en reserva', url: '' },
      { label: 'Completar datos cliente' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  cargar(): void {

    this.activatedRoute.params.subscribe(
      emp => {
        this.id = emp['doc'];
        this.reservation = emp['res'];
        console.log("reservation: "+ this.reservation);
        console.log("id: "+ this.id);

        if (this.id) {
          this.clientService.getClient(this.id).subscribe(
            es => this.client = es
          );

        }
      }
    );



    console.log("Documento: " + this.id);
    console.log("Reserva: " + this.reservation);

  }

  register(): void {
    //pongo esto porque el componente p-inputNumber siempre retorna un número y no string
    this.client.person.document = this.client.person.document + '';
    this.client.document = this.client.document + '';


    this.clientService.registerClient(this.client).subscribe(
      res => {
        this.toastr.success('El cliente se ha registrado satisfactoriamente.', 'Registro cliente', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/client/list-clients'])
      }
    );
  }

  update(): void {

    //pongo esto porque el componente p-inputNumber siempre retorna un número y no string
    this.client.person.document = this.client.person.document + '';
    this.client.document = this.client.document + '';

    this.clientService.updateClient(this.client).subscribe(
      emp => {
        this.toastr.info('El Cliente se ha actualizado satisfactoriamente.', 'Actualziar cliente', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/client/list-clients'])
      }
    );
  }

  complete(): void {

    //pongo esto porque el componente p-inputNumber siempre retorna un número y no string
    this.client.person.document = this.client.person.document + '';
    this.client.document = this.client.document + '';

    this.clientService.updateClient(this.client).subscribe(
      emp => {
        this.toastr.info('El Cliente se ha actualizado satisfactoriamente.', 'Completar datos cliente', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/booking/validate-booking',this.reservation])
      }
    );
  }

}
