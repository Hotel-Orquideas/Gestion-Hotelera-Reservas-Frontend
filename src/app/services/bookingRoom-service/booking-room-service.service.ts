import { Injectable } from '@angular/core';
import { BookingRoom } from 'src/app/components/booking-components/list-bookings/bookingRoom';
import { Room } from 'src/app/components/room-components/list-rooms/room';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingRoomServiceService {

  private urlEndPoint: string = 'http://localhost:3005/management/api/bookingRoom';

  constructor(private http:HttpClient) { }

      /**
   * Se obtiene una lista de todas las habitaciones en una reserva
   * @returns lista de habitaciones en una reserva
   */
       getRooms(idBooking:number):Observable<Room[]>{
        return this.http.get<Room[]>(this.urlEndPoint+'/'+idBooking);
      }
    
      /**
       * Registrar una habitación en una reserva
       * @param bookingRoom 
       * @returns 
       */
      registerBookingRoom(bookingRoom:BookingRoom):Observable<BookingRoom>{
        
        return this.http.post<BookingRoom>(this.urlEndPoint+'/'+bookingRoom.idBooking+'/'+bookingRoom.idRoom,bookingRoom);
      }

}
