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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../../service-components/list-services/service';
import { ServiceService } from 'src/app/services/service-service/service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css'],
  providers: [MessageService],
})
export class ViewBookingComponent implements OnInit {

  booking: Booking;
  clients: Client[] = new Array;
  rooms: Room[] = new Array;
  roomTypes: RoomType[] = new Array(); // para traer todos los tipos de habitaciones
  services: Service[] = new Array() //para traer todos los servicios cuando se solicite
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb
  showContentAddService: boolean = false;//para el p-dialog
  llegadaPrueba: Date = new Date;
  salidaPrueba: Date = new Date;
  public formRegisterService: FormGroup = new FormGroup<any>('');//para formulario registrar servicio a reserva

  //para hacer pruebas
  services2: any = [
    {
      "id": 4,
      "name": "servicio4"
    },
    {
      "id": 5,
      "name": "servicio5"
    },
    {
      "id": 6,
      "name": "servicio6"
    }
  ];
  servicesTable: any = [
    {
      "id": 1,
      "name": "servicio1",
      "quantity": 1,
      "total": 5000
    },
    {
      "id": 2,
      "name": "servicio2",
      "quantity": 2,
      "total": 10000
    },
    {
      "id": 3,
      "name": "servicio3",
      "quantity": 3,
      "total": 15000
    },
  ];
  serviceSelected: any;
  quantity: any;

  booking2:any={
    "state":"A"
  };


  constructor(private serviceService: ServiceService, private roomTypeService: RoomTypeService, private bookingService: BookingService, private bookingRoomServiceService: BookingRoomServiceService, private bookingClientService: BookingClientService, private activatedRoute: ActivatedRoute, private primengConfig: PrimeNGConfig, private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    //para obtener los tipos de habitación
    this.roomTypeService.getRoomTypes().subscribe(
      roomType => this.roomTypes = roomType
    );

    //obtener todos los servicios
    this.serviceService.getServices().subscribe(
      service => this.services = service
    );

    this.activatedRoute.params.subscribe(

      emp => {
        let id = emp['id'];
        if (id) {
          //obtener reserva
          this.bookingService.getBooking(id).subscribe(
            es => this.booking = es,
            error => console.log(error)
          );

          //obtener clientes en reserva
          this.bookingClientService.getClients(id).subscribe(
            cl => {
              this.clients = cl;
            },
            error => console.log(error)
          );

          //obtener habitaciones en reserva
          this.bookingRoomServiceService.getRooms(id).subscribe(
            rm => {
              this.rooms = rm;
            },
            error => console.log(error)
          );
        }
      }
    );

    //validaciones básicas para el formulario de registrar servicio a reserva
    this.formRegisterService = this.formBuilder.group({
      quantity: ['', [
        Validators.required
      ]],
      serviceSelected: ['', [
        Validators.required
      ]]
    });


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Reservas' },
      { label: 'Reservas registradas', url: 'booking/list-bookings' },
      { label: 'Visualizar reserva' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/home' };
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

  showAddService() {
    this.showContentAddService = true;
    if (this.services.length >= 1) {

      this.showContentAddService = true;

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay servicios registrados. Registre uno y vuelva a intentar.', life: 3000 });
    }

  }

  //limpio el formulario si se cierra la ventana o si se agrega servicio
  showMessageOperationCanceled() {
    this.serviceSelected = undefined;
    this.quantity = undefined;
  }

  registerServiceInBooking() {
    let nameSelected:string="";
    for (const serv of this.services2) {
      if(serv.id==this.serviceSelected){
        nameSelected=serv.name;
      }
      
    }
    this.servicesTable.push(
      {
        "id": this.serviceSelected,
        "name": nameSelected,
        "quantity": this.quantity,
        "total": 20000
      }
    );
    this.messageService.add({ severity: 'success', summary: 'Agregado', detail: 'El servicio se ha agregado correctamente.', life: 3000 });
    this.showContentAddService = false;
  }

  changeState(){
    this.booking2.state='I';
  }

}
