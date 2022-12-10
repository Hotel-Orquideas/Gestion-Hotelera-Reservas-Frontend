import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { BookingClientService } from 'src/app/services/bookingClient-service/booking-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../client-components/list-clients/client';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/services/booking-service/booking.service';


@Component({
  selector: 'app-validate-booking',
  templateUrl: './validate-booking.component.html',
  styleUrls: ['./validate-booking.component.css']
})
export class ValidateBookingComponent implements OnInit {


  clients: Client[] = new Array();
  validated: boolean = true;
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb
  id: any;

  constructor(private bookingService: BookingService, private bookingClientService: BookingClientService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

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
    this.home = { icon: 'pi pi-home', routerLink: '/home' };

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

  validateBooking() {
    for (const cl of this.clients) {
      if (cl.client.state != "A") {
        this.validated = false;
      }
    }

    if (this.validated == false) {

      this.toastr.info('Aún hay clientes con estado incompleto, complete los datos e intente nuevamente.', 'Validar clientes', {
        closeButton: true,
        progressBar: true
      });

    } else {

      this.bookingService.updateStateBooking(this.id, 'A').subscribe(
        res => {
          this.toastr.success('El checkin se ha realizado correctamente.', 'Validar clientes', {
            closeButton: true,
            progressBar: true
          });
          this.router.navigate(['/booking/list-bookings-checkin']);
        },
        error => {
          this.toastr.error('Ha ocurrido un error inesperado: '+ error.status, 'Error', {
            closeButton: true,
            progressBar: true
          });
        }
      );


    }


  }

}
