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
import { Booking2 } from '../list-bookings/booking2';
import { RoomService } from './roomService';
import { RoomServiceService } from 'src/app/services/room-service-service/room-service.service';
import { Bill } from '../../bill-components/list-bills/bill';
import { BillService } from 'src/app/services/bill-service/bill.service';
import { BillDetails } from '../../bill-components/list-bills-details/billDetails';
import { BillDetailService } from 'src/app/services/bill-service/bill-detail.service';


@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css'],
  providers: [MessageService],
})
export class ViewBookingComponent implements OnInit {

  booking: Booking2 = new Booking2();
  clients: Client[] = new Array;
  rooms: Room[] = new Array;
  roomServices: RoomService[] = new Array();//para listar todos los servicios en la reserva
  roomService: RoomService = new RoomService();//para registar un nuevo servicio
  services: Service[] = new Array() //para traer todos los servicios cuando se solicite
  bills:Bill[]=new Array(); //para poder buscar la factura del cliente de esta reserva
  newBillDetail:BillDetails = new BillDetails;
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb
  showContentAddService: boolean = false;//para el p-dialog
  public formRegisterService: FormGroup = new FormGroup<any>('');//para formulario registrar servicio a reserva

  serviceSelected: number;
  quantity: number;

  constructor(private billDetailService:BillDetailService,private billService:BillService,private roomServiceService: RoomServiceService, private serviceService: ServiceService, private roomTypeService: RoomTypeService, private bookingService: BookingService, private bookingRoomServiceService: BookingRoomServiceService, private bookingClientService: BookingClientService, private activatedRoute: ActivatedRoute, private primengConfig: PrimeNGConfig, private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    //obtener todos los servicios
    this.serviceService.getServices().subscribe(
      service => this.services = service
    );

    
    this.activatedRoute.params.subscribe(

      emp => {
        let id = emp['id'];
        console.log("id: " + id)
        if (id) {
          //obtener reserva
          this.bookingService.getBooking(id).subscribe(
            es => {
              this.booking = es;

              if (this.booking.state == 'B') {

                //traemos todos los servicios en la reserva
                this.roomServiceService.getRoomServices(id).subscribe(
                  rs => this.roomServices = rs
                );

                //obtener todas las facturas (esto solo para poder buscar la factura del cliente y añadirle servicio)
                this.billService.getBills().subscribe(
                  bill => this.bills = bill
                );

              }
            },
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
      ]],
      roomSelected: ['', [
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
    this.roomService.bookingRoomBookingId = this.booking.id;
    this.roomServiceService.registerRoomService(this.roomService).subscribe(
      res => {
        //traemos todos los servicios en la reserva
        this.roomServiceService.getRoomServices(this.booking.id).subscribe(
          rs => this.roomServices = rs
        );
        this.messageService.add({ severity: 'success', summary: 'Agregado', detail: 'El servicio se ha agregado correctamente.', life: 3000 });
        this.showContentAddService = false;

      }
    );

    //en base al formulario añado los datos en el detalle de la factura
    
    for (let i = 0; i < this.services.length; i++) {
      
      if(this.roomService.serviceId==this.services[i].id){
        this.newBillDetail.value=this.services[i].pricePerUnit*this.roomService.quantity;
        this.newBillDetail.description=this.services[i].name;
      }
      
    }
    
    this.billDetailService.registerBillDetail(this.searchIdBill(),this.newBillDetail).subscribe();


  }

  //se busca la factura si viene con cliente o si viene con empresa -- terminar
  searchIdBill(){
    let billId:number=0;
    for (let i = 0; i < this.bills.length; i++) {
      try {

        if(this.booking.client.person.document==this.bills[i].client.person.document){
          billId=this.bills[i].id;
        }
        
      } catch (error) {
        
      }

      
    }
    
    return billId;
  }

}
