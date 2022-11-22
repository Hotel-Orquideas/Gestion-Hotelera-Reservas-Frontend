import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from 'src/app/components/booking-components/list-bookings/booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private urlEndPoint: string = 'http://localhost:3005/management/api/booking';

  constructor(private http: HttpClient) { }

    /**
   * Se obtiene una lista de todas las reservas
   * @returns lista de reservas
   */
     getBookings():Observable<Booking[]>{
      return this.http.get<Booking[]>(this.urlEndPoint);
    }
  
    /**
     * Registrar una reserva en la base de datos
     * @param booking 
     * @returns 
     */
    registerBooking(booking:Booking):Observable<Booking>{
      
      return this.http.post<Booking>(this.urlEndPoint,booking);
    }
}
