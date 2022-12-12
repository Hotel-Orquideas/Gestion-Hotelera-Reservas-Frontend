import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomService } from 'src/app/components/booking-components/view-booking/roomService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {

  private urlEndPoint: string = 'http://54.90.71.67:3005/management/api/roomService';

  constructor(private http: HttpClient) { }

    /**
   * Se obtiene una lista de todos los servicios añadidos a una reserva "habitación"
   * @returns lista de habitaciones
   */
    getRoomServices(bookingId:number):Observable<RoomService[]>{
      return this.http.get<RoomService[]>(this.urlEndPoint+'/all/'+bookingId);
    }
  
    /**
     * Registrar un servicio a una reserva (habitación) en la base de datos
     * @param roomService 
     * @returns 
     */
    registerRoomService(roomService:RoomService):Observable<RoomService>{
      
      return this.http.post<RoomService>(this.urlEndPoint,roomService);
    }

}
