import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rate } from '../list-rates/rate';
import { RoomType } from '../../roomType-components/list-room-types/roomType';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { RateService } from 'src/app/services/rate-service/rate.service';
import { RoomTypeService } from 'src/app/services/roomType-service/room-type.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-register-rate',
  templateUrl: './register-rate.component.html',
  styleUrls: ['./register-rate.component.css']
})
export class RegisterRateComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar

  rate: Rate = new Rate();
  roomTypes: RoomType[] = new Array();
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar servicio
  home: MenuItem = {};//para breadcrumb

  constructor(private rateService: RateService, private roomTypeService: RoomTypeService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }


  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true

    //validaciones básicas para el formulario de registrar
    this.formRegister = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]],
      value: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6)
      ]],
      roomTypeId: ['']
    });

    //traemos todos los tipo de habitación
    this.roomTypeService.getRoomTypes().subscribe(
      rt => this.roomTypes = rt
    );

    this.cargar(); //llena el formulario si existe id en el parametro url

    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Tarifa' },
      { label: 'Registrar tarifa' }
    ];

    //etiquetas para el breadcrumb cuando es actualziar servicio
    this.itemsElse = [
      { label: 'Tarifa' },
      { label: 'Tarifas registradas', url: 'rate/list-rates' },
      { label: 'Actualizar tarifa' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //comprobar que existe al menos un tipo de habitación para poder dejar ingresar a agregar
  existsRoomTypes() {

    if (this.roomTypes.length >= 1) {
    } else {
      this.toastr.error('Error, no hay tipos de habitación registrados, registre uno y vuelva a intentar.', 'Error', {
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['/rate/list-rates']);
    }

  }

  cargar(): void {

    this.activatedRoute.params.subscribe(
      rat => {
        let id = rat['id'];
        if (id) {
          this.rateService.getRate(id).subscribe(
            tar => this.rate = tar
          );

        }
      }
    );

  }

  register(): void {


    this.rateService.registerRate(this.rate).subscribe(
      res => {
        this.toastr.success('La tarifa se ha registrado satisfactoriamente.', 'Registro tarifa', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/rate/list-rates'])
      }
    );
  }

  update(): void {

    this.rateService.updateRate(this.rate).subscribe(
      emp => {
        this.toastr.info('La tarifa se ha actualizado satisfactoriamente.', 'Actualziar tarifa', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/rate/list-rates'])
      }
    );
  }
  /*

  //comprobamos que haya almenos un tipo de habitación, sino mandamos un mensaje que registre uno
  showIsEmpty(name:string){



    if (name == "") {
      this.toastr.error('No hay tipos de habitaciones registrados. Registre uno y vuelva a intentar.', 'Error', {
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['/rate/list-rates'])
      
    }
  }
  */


}
