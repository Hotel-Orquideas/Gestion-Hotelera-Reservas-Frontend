import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/services/room-service/room.service';
import { Room } from '../list-rooms/room';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Rate } from '../../rate-components/list-rates/rate';
import { RoomType } from '../../roomType-components/list-room-types/roomType';
import { RateService } from 'src/app/services/rate-service/rate.service';
import { RoomTypeService } from 'src/app/services/roomType-service/room-type.service';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css']
})
export class ViewRoomComponent implements OnInit {

  room: Room;
  roomTypes: RoomType[] = new Array();
  items: MenuItem[] = new Array;//para breadcrumb
  home: MenuItem = {};//para breadcrumb

  constructor(private roomService: RoomService, private roomTypService: RoomTypeService, private activatedRoute: ActivatedRoute, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    //traemos los datos de la habitación
    this.activatedRoute.params.subscribe(

      rm => {
        let id = rm['id'];
        if (id) {
          this.roomService.getRoom(id).subscribe(
            es => this.room = es
          );

        }
      }
    );

    //traemos todos los tipos de habitación
    this.roomTypService.getRoomTypes().subscribe(
      es => this.roomTypes = es
    );


    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Habitación' },
      { label: 'Habitaciones registradas', url: 'room/list-rooms' },
      { label: 'Visualizar habitación' }
    ];

    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  //función para texto en badge
  textInBadge(status: string): string {

    if (status == "A") {
      return "Activo"
    } else if (status == "O") {
      return "Ocupada"
    } else {
      return "Sin estado - error"
    }

  }


  //función para color del badge
  colorInBadge(status: string): string {

    if (status == "A") {
      return "success"
    } else if (status == "O") {
      return "warning"
    } else {
      return "Sin color - error"
    }

  }

  nameRoomType(id:number):string{
    let nameRoomType:string;
    for (let i = 0; i < this.roomTypes.length; i++) {
      
      if(this.roomTypes[i].id===id){
        nameRoomType= this.roomTypes[i].name;
      }
      
    }

    return nameRoomType

  }

}
