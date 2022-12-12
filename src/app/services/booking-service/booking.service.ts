import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from 'src/app/components/booking-components/list-bookings/booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private urlEndPoint: string = 'https://backend-gestion-hotelera.fly.dev/management/api/booking';

  constructor(private http: HttpClient) { }

  /**
 * Se obtiene una lista de todas las reservas
 * @returns lista de reservas
 */
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.urlEndPoint);
  }

  /**
* Se obtiene una lista de todas las reservas con estado de checkin
* @returns lista de reservas
*/
  getBookingsCheckIn(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.urlEndPoint+'/checkin/'+0);
  }

  /**
   * Registrar una reserva en la base de datos
   * @param booking 
   * @returns 
   */
  registerBooking(booking: Booking): Observable<any> {

    return this.http.post<any>(this.urlEndPoint, booking);
  }

  /**
* Se envía el id a consultar
* @param id
* @returns Obtener una sola reserva
*/
  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(this.urlEndPoint + '/' + id);
  }

  /**
   * cambia el estado de la reserva según sea el estado que se envía
   * @param id 
   * @returns 
   */
  updateStateBooking(id:number, state:string):Observable<Booking>{
    return this.http.put<Booking>(this.urlEndPoint+'/'+id+'/'+state,null);
  }
}
