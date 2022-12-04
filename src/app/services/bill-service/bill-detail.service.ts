import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BillDetails } from 'src/app/components/bill-components/list-bills-details/billDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillDetailService {

  private urlEndPoint: string = 'http://localhost:3005/management/api/billDetails';

  constructor(private http:HttpClient) { }

  /**
   * Retorna todos los detalles de la factura que se pasa por parametro
   * @param idBill 
   * @returns 
   */
  getBillDetails(idBill:number): Observable<BillDetails[]> {
    return this.http.get<BillDetails[]>(this.urlEndPoint+'/'+idBill);
  }
}
