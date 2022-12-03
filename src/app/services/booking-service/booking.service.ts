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
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.urlEndPoint);
  }

  /**
* Se obtiene una lista de todas las reservas con estado de checkin
* @returns lista de reservas
*/
  getBookingsCheckIn(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.urlEndPoint+'/checkin');
  }

  /**
   * Registrar una reserva en la base de datos
   * @param booking 
   * @returns 
   */
  registerBooking(booking: Booking): Observable<Booking> {

    return this.http.post<Booking>(this.urlEndPoint, booking);
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
   * Mejorar esta consulta con el backend
   * @param id 
   * @returns 
   */
  setCheckOutBooking(id:number):Observable<Booking>{
    return this.http.post<Booking>(this.urlEndPoint,id)
  }
}
