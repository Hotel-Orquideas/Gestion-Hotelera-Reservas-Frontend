import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { Booking } from '../list-bookings/booking';
import { Room } from '../../room-components/list-rooms/room';
import { Client } from '../../client-components/list-clients/client';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { BookingRoomServiceService } from 'src/app/services/bookingRoom-service/booking-room-service.service';
import { RoomService } from 'src/app/services/room-service/room.service';
import { BookingRoom } from '../list-bookings/bookingRoom';
import { RoomType } from '../../roomType-components/list-room-types/roomType';
import { RoomTypeService } from 'src/app/services/roomType-service/room-type.service';

@Component({
  selector: 'app-register-booking',
  templateUrl: './register-booking.component.html',
  styleUrls: ['./register-booking.component.css']
})
export class RegisterBookingComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar

  booking: Booking;
  bookings: Booking[];
  bookingRoomsSearch: BookingRoom[];
  BookingsWithOccupiedRooms: Booking[];
  clients: Client[];
  room:Room;
  rooms: Room[];
  roomType:RoomType
  occupiedRooms: Room[];
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar tipo de habitación
  home: MenuItem = {};//para breadcrumb
  todayDate: Date = new Date;
  maxDateCheckIn: Date = new Date;
  maxDateCheckOut: Date = new Date;
  check_in_date: Date;
  check_out_date: Date;
  roomId:any;
  numMaxPersonsPerRoom:number;

  constructor(private bookingService: BookingService, private bookingRoomServiceService: BookingRoomServiceService, private roomService: RoomService, private roomTypeService:RoomTypeService,private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    //validaciones básicas para el formulario de registrar
    this.formRegister = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      numMaxGuests: ['', [
        Validators.required,
      ]]
    });



    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Tipo de habitación' },
      { label: 'Registrar tipo de habitación' }
    ];


    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.maxDateCheckIn.setFullYear(this.todayDate.getFullYear());
    this.maxDateCheckIn.setMonth(this.todayDate.getMonth() + 6);

    //se obtienen todas las reservas

    this.bookingService.getBookings().subscribe(
      bking => {
        this.bookings = bking
      }
    );

    //se obtienen todas las habitaciones

    this.roomService.getRooms().subscribe(
      room => {
        this.rooms = room
      }
    );

  }

  //se valida que se ingrese fecha en checkin y luego se le añadie la fecha minima y máxima al campo de checkout
  validateDate(): void {
    this.maxDateCheckOut.setFullYear(this.check_in_date.getFullYear());
    this.maxDateCheckOut.setMonth(this.check_in_date.getMonth() + 1);
  }

  obtainAvalaibleRooms(): void {


    for (let i = 0; i < this.bookings.length; i++) {

      if ((this.check_in_date > this.bookings[i].checkInDate && this.check_in_date < this.bookings[i].checkOutDate) ||
        this.check_out_date > this.bookings[i].checkInDate && this.check_out_date < this.bookings[i].checkOutDate) {

        this.BookingsWithOccupiedRooms.push(this.bookings[i]);
      }

    }

    for (let i = 0; i < this.BookingsWithOccupiedRooms.length; i++) {

      this.bookingRoomServiceService.getBookingRooms(this.BookingsWithOccupiedRooms[i].id).subscribe(
        broom => this.bookingRoomsSearch = broom
      );

      for (let j = 0; j < this.rooms.length; j++) {

      }


    }



    console.log(this.todayDate < (new Date()));
  }

  getNumberMaxPersonsInRoom(id:string){

    /*
    this.roomService.getRoom(id).subscribe(
      rm=>this.room=rm
    );

    this.roomTypeService.getRoomType(this.room.roomTypeId).subscribe(
      rt=>this.roomType=rt
    );
  */


    this.numMaxPersonsPerRoom=2;
  }

  register(): void {


    this.bookingService.registerBooking(this.booking).subscribe(
      res => {
        this.toastr.success('La reserva se ha registrado correctamente.', 'Registro de reserva', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/booking/list-bookings'])
      }
    );
  }

  //comprobar que existe al menos una empresa para poder dejar ingresar a agregar
  existsClients() {

    if (this.clients.length >= 1) {
    } else {
      this.toastr.error('Error, no hay empresas registradas, registre una y vuelva a intentar.', 'Error', {
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['/promotion/list-promotions']);
    }

  }

}
