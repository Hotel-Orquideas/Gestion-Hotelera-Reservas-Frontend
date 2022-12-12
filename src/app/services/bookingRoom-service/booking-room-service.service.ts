import { Injectable } from '@angular/core';
import { BookingRoom } from 'src/app/components/booking-components/list-bookings/bookingRoom';
import { Room } from 'src/app/components/room-components/list-rooms/room';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingRoomServiceService {

  private urlEndPoint: string = 'https://backend-gestion-hotelera.fly.dev/management/api/bookingRoom';

  constructor(private http:HttpClient) { }

      /**
   * Se obtiene una lista de todas las habitaciones en una reserva
   * @returns lista de habitaciones en una reserva
   */
       getRooms(idBooking:number):Observable<Room[]>{
        return this.http.get<Room[]>(this.urlEndPoint+'/'+idBooking);
      }
    
      /**
       * Registrar habitaciones en una reserva
       * @param bookingRoom 
       * @returns 
       */
      registerBookingRooms(bookingId:number,rooms:any):Observable<any>{
        console.log("rooms"+ rooms[0].id);
        return this.http.post<any>(this.urlEndPoint+'/'+bookingId,rooms);
      }

}
