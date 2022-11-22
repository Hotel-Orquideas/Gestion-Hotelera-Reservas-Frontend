import { Injectable } from '@angular/core';
import { BookingRoom } from 'src/app/components/booking-components/list-bookings/bookingRoom';
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
       getBookingRooms(idReservation:number):Observable<BookingRoom[]>{
        return this.http.get<BookingRoom[]>(this.urlEndPoint+'/'+idReservation);
      }
    
      /**
       * Registrar una habitación en una reserva
       * @param bookingRoom 
       * @returns 
       */
      registerBookingRoom(bookingRoom:BookingRoom):Observable<BookingRoom>{
        
        return this.http.post<BookingRoom>(this.urlEndPoint+'/'+bookingRoom.idReservation+'/'+bookingRoom.idRoom,bookingRoom);
      }

}
