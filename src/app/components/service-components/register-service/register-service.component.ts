import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../list-services/service';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service-service/service.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-register-service',
  templateUrl: './register-service.component.html',
  styleUrls: ['./register-service.component.css']
})
export class RegisterServiceComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar

  service: Service = new Service();
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar servicio
  home: MenuItem = {};//para breadcrumb

  constructor(private serviceService: ServiceService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true

    //validaciones básicas para el formulario de registrar
    this.formRegister = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      pricePerUnit: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6)
      ]]
    });

    this.cargar(); //llena el formulario si existe id en el parametro url

    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Servicio' },
      { label: 'Registrar servicio' }
    ];

    //etiquetas para el breadcrumb cuando es actualziar servicio
    this.itemsElse = [
      { label: 'Servicio' },
      { label: 'Servicios registrados', url:'service/list-services' },
      { label: 'Actualizar servicio' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/home' };

  }

  cargar(): void {

    this.activatedRoute.params.subscribe(
      serv => {
        let id = serv['id'];
        if (id) {
          this.serviceService.getService(id).subscribe(
            ser => this.service = ser
          );
          
        }
      }
    );

  }

  register(): void {

    
    this.serviceService.registerService(this.service).subscribe(
      res => {
        this.toastr.success('El servicio se ha registrado satisfactoriamente.', 'Registro servicio',{
          closeButton:true,
          progressBar:true
        });
        this.router.navigate(['/service/list-services'])}
    );
  }

  update(): void {
    this.serviceService.updateService(this.service).subscribe(
      emp => {
        this.toastr.info('El servicio se ha actualizado satisfactoriamente.', 'Actualziar servicio', {
          closeButton:true,
          progressBar:true
        });
        this.router.navigate(['/service/list-services'])}
    );
  }


}
