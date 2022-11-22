import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../list-clients/client';
import { MenuItem } from 'primeng/api';
import { ClientService } from 'src/app/services/client-service/client.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {

  client: Client;
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

        //para darle efecto al hacer click a los botones
        this.primengConfig.ripple = true;

        this.activatedRoute.params.subscribe(
    
          emp => {
            let doc = emp['doc'];
            if (doc) {
              this.clientService.getClient(doc).subscribe(
                es => this.client = es
              );
    
            }
          }
        );
    
        //etiquetas para el breadcrumb
        this.items = [
          { label: 'Cliente' },
          { label: 'Clientes registrados', url: 'client/list-clients' },
          { label: 'Visualizar cliente' }
        ];
    
        //icono de casa pra el breadcrumb
        this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  genreInText(genre:string):string{
      
    if(genre=="F"){
      return "Femenino";
    }else if(genre=="M"){
      return "Masculino";
    }else if(genre=="O"){
      return "Otro";
    }else{
      return "Sin género - error"
    }

  }

}
