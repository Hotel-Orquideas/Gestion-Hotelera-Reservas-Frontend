import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { Booking } from '../list-bookings/booking';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Client } from '../../client-components/list-clients/client';
import { Room } from '../../room-components/list-rooms/room';
import { BookingRoomServiceService } from 'src/app/services/bookingRoom-service/booking-room-service.service';
import { BookingClientService } from 'src/app/services/bookingClient-service/booking-client.service';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { RoomType } from '../../roomType-components/list-room-types/roomType';
import { RoomTypeService } from 'src/app/services/roomType-service/room-type.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

  booking: Booking;
  clients: Client[] = new Array;
  rooms: Room[] = new Array;
  roomTypes: RoomType[] = new Array(); // para traer todos los tipos de habitaciones
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb
  llegadaPrueba:Date=new Date;
  salidaPrueba:Date=new Date;

  constructor(private roomTypeService: RoomTypeService,private bookingService: BookingService, private bookingRoomServiceService: BookingRoomServiceService, private bookingClientService: BookingClientService, private activatedRoute: ActivatedRoute, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    //para obtener los tipos de habitación
    this.roomTypeService.getRoomTypes().subscribe(
      roomType => this.roomTypes = roomType
    );

    this.activatedRoute.params.subscribe(

      emp => {
        let id = emp['id'];
        if (id) {
          //obtener reserva
          this.bookingService.getBooking(id).subscribe(
            es => this.booking = es,
            error=>console.log(error)
          );

          //obtener clientes en reserva
          this.bookingClientService.getClients(id).subscribe(
            cl => {
              this.clients = cl;
            },
            error=>console.log(error)
          );

          //obtener habitaciones en reserva
          this.bookingRoomServiceService.getRooms(id).subscribe(
            rm => {
              this.rooms = rm;
            },
            error=>console.log(error)
          );
        }
      }


    );

    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Reservas' },
      { label: 'Reservas registradas', url: 'booking/list-bookings' },
      { label: 'Visualizar reserva' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  //obtener el nombre de un tipo de habitación
  nameRoomType(id: number): string {
    let nameRoomType: string;
    for (let i = 0; i < this.roomTypes.length; i++) {

      if (this.roomTypes[i].id === id) {
        nameRoomType = this.roomTypes[i].name;
      }

    }

    return nameRoomType

  }

}
