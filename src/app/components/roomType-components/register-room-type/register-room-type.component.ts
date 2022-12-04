import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomType } from '../list-room-types/roomType';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { RoomTypeService } from 'src/app/services/roomType-service/room-type.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-register-room-type',
  templateUrl: './register-room-type.component.html',
  styleUrls: ['./register-room-type.component.css']
})
export class RegisterRoomTypeComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar

  roomType: RoomType = new RoomType();
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar tipo de habitación
  home: MenuItem = {};//para breadcrumb

  constructor(private roomTypeService: RoomTypeService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

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

    this.cargar(); //llena el formulario si existe id en el parametro url

    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Tipo de habitación' },
      { label: 'Registrar tipo de habitación' }
    ];

    //etiquetas para el breadcrumb cuando es actualziar servicio
    this.itemsElse = [
      { label: 'Servicio' },
      { label: 'Tipos de habitaciones registradas', url: 'roomType/list-room-types' },
      { label: 'Actualizar servicio' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/home' };

  }

  cargar(): void {

    this.activatedRoute.params.subscribe(
      rtype => {
        let id = rtype['id'];
        if (id) {
          this.roomTypeService.getRoomType(id).subscribe(
            rt => this.roomType = rt
          );

        }
      }
    );

  }

  register(): void {


    this.roomTypeService.registerRoomType(this.roomType).subscribe(
      res => {
        this.toastr.success('El tipo de habitación se ha registrado satisfactoriamente.', 'Registro tipo habitación', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/roomType/list-room-types'])
      }
    );
  }

  update(): void {
    this.roomTypeService.updateRoomType(this.roomType).subscribe(
      emp => {
        this.toastr.info('El tipo de habitación se ha actualizado satisfactoriamente.', 'Actualziar tipo habitación', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/roomType/list-room-types'])
      }
    );
  }

}
