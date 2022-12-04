import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from 'src/app/components/bill-components/list-bills/bill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private urlEndPoint: string = 'http://localhost:3005/management/api/bill';

  constructor(private http: HttpClient) { }

  /**
* Se obtiene una lista de todas las facturas
* @returns lista de reservas
*/
  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.urlEndPoint);
  }

  /**
   * obtiene una sola factura
   * @param id
   * @returns 
   */
  getBill(id: number): Observable<Bill> {
    return this.http.get<Bill>(this.urlEndPoint + '/' + id);
  }
}
