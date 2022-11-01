import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../list-rooms/room';
import { RoomType } from '../../roomType-components/list-room-types/roomType';
import { Rate } from '../../rate-components/list-rates/rate';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/services/room-service/room.service';
import { RateService } from 'src/app/services/rate-service/rate.service';
import { RoomTypeService } from 'src/app/services/roomType-service/room-type.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-register-room',
  templateUrl: './register-room.component.html',
  styleUrls: ['./register-room.component.css']
})
export class RegisterRoomComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar

  room: Room = new Room();
  roomTypes: RoomType[] = new Array();
  rates: Rate[] = new Array();
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar servicio
  home: MenuItem = {};//para breadcrumb

  constructor(private roomService: RoomService, private rateService: RateService, private roomTypeService: RoomTypeService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true

    //validaciones básicas para el formulario de registrar
    this.formRegister = this.formBuilder.group({
      number: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]],
      roomTypeId: [''],
      state: ['']
    });

    //traemos todos los tipo de habitación
    this.roomTypeService.getRoomTypes().subscribe(
      rt => this.roomTypes = rt
    );

    //traemos todas las tarifas
    this.rateService.getRates().subscribe(
      rat => this.rates = rat
    );

    this.cargar(); //llena el formulario si existe id en el parametro url

    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Habitación' },
      { label: 'Registrar Habitación' }
    ];

    //etiquetas para el breadcrumb cuando es actualziar servicio
    this.itemsElse = [
      { label: 'Habitación' },
      { label: 'Habitaciones registradas', url: 'room/list-rooms' },
      { label: 'Actualizar habitación' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //comprobar que existe al menos un tipo de habitación para poder dejar ingresar a agregar
  existsRoomTypes() {

    if (this.roomTypes.length >= 1) {
    } else {
      this.toastr.error('No hay tipos de habitación registrados. Registre uno e intente nuevamente', 'Error', {
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['/room/list-rooms'])
    }

  }

  cargar(): void {

    this.activatedRoute.params.subscribe(
      rat => {
        let id = rat['id'];
        if (id) {
          this.roomService.getRoom(id).subscribe(
            rm => this.room = rm
          );

        }
      }
    );

  }

  register(): void {


    this.roomService.registerRoom(this.room).subscribe(
      res => {
        this.toastr.success('La habitación se ha registrado satisfactoriamente.', 'Registro habitación', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/room/list-rooms'])
      }
    );
  }

  update(): void {

    this.roomService.updateRoom(this.room).subscribe(
      emp => {
        this.toastr.info('La habitación se ha actualizado satisfactoriamente.', 'Actualziar habitación', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/room/list-rooms'])
      }
    );
  }

}
