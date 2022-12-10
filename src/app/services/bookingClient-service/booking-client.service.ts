import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingClient } from 'src/app/components/booking-components/list-bookings/bookingClient';
import { Observable } from 'rxjs';
import { Client } from '../../components/client-components/list-clients/client';

@Injectable({
  providedIn: 'root'
})
export class BookingClientService {

  private urlEndPoint: string = 'http://localhost:3005/management/api/bookingClient';

  constructor(private http: HttpClient) { }

  /**
 * Se obtiene una lista de todos los clientes registrados en una reserva
 * @returns lista de clientes en reserva
 */
  getClients(idBooking: number): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlEndPoint + '/' + idBooking);
  }

  /**
 * Registrar clientes en una reserva
 * @param client 
 * @returns 
 */
  registerBookingClients(bookingId: number, clients: any): Observable<any> {
    console.log("document "+clients[0].document);
    return this.http.post<any>(this.urlEndPoint + '/' + bookingId, clients);
  }
}
