import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { BookingClientService } from 'src/app/services/bookingClient-service/booking-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../client-components/list-clients/client';
import { ToastrService } from 'ngx-toastr';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-validate-booking',
  templateUrl: './validate-booking.component.html',
  styleUrls: ['./validate-booking.component.css']
})
export class ValidateBookingComponent implements OnInit {


  clients: any[] = [
    {
      "id": 1,
      "name": "Brayan Andres",
      "lastName": "Cardenas Rodriguez",
      "state": "I",
      "email": "julian@mail.es",
      "phoneNumber": "3192002085",
      "document": "1000063183"
    },
    {
      "id": 2,
      "name": "julian2",
      "lastName": "castañeda2",
      "state": "A",
      "email": "julian2@mail.es",
      "phoneNumber": "3152",
      "document": "101"
    },
    {
      "id": 3,
      "name": "julian3",
      "lastName": "castañeda3",
      "state": "A",
      "email": "julian3@mail.es",
      "phoneNumber": "3153",
      "document": "102"
    }
  ];
  validated:boolean=true;
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb
  id: any;

  constructor(private bookingClientService: BookingClientService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService,private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    this.activatedRoute.params.subscribe(
      emp => {
        this.id = emp['id'];


        if (this.id) {

          this.bookingClientService.getClients(this.id).subscribe(
            client => this.clients = client
          );

        }
      }
    );



    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Reservas' },
      { label: 'Reservas registradas', url: 'booking/list-bookings' },
      { label: 'Validar reserva' },
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //función para texto en badge
  textInBadge(status: string): string {

    if (status == "A") {
      return "Completo"
    } else if (status == "I") {
      return "Incompleto"
    } else {
      return "Otro"
    }

  }


  //función para color del badge
  colorInBadge(status: string): string {

    if (status == "A") {
      return "success"
    } else if (status == "I") {
      return "warning"
    } else {
      return "Sin color"
    }

  }

  validateBooking(){
    for (const cl of this.clients) {
      if(cl.state!="A"){
        this.validated=false;
      }
    }

    if(this.validated==false){

      this.toastr.info('Aún hay clientes con estado incompleto, complete los datos e intente nuevamente.', 'Validar clientes', {
        closeButton: true,
        progressBar: true
      });

    }else{
      this.toastr.success('El checkin se ha realizado correctamente.', 'Validar clientes', {
        closeButton: true,
        progressBar: true
      });
    }


  }

}
