import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentHistory } from 'src/app/components/bill-components/list-payments-history/paymentHistory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {

  private urlEndPoint: string = 'http://54.90.71.67:3005/management/api/paymentHistory';


  constructor(private http: HttpClient) { }

  /**
 * Retorna todos los pagos de la factura que se pasa por parametro
 * @param idBill 
 * @returns 
 */
   getPaymentsHistory(idBill: number): Observable<PaymentHistory[]> {
    return this.http.get<PaymentHistory[]>(this.urlEndPoint + '/all/' + idBill);
  }

  /**
   * Registrar un pago a una factura
   * @param paymentHistory 
   * @returns 
   */
  registerPaymentHistory(paymentHistory:PaymentHistory, idBill:number):Observable<PaymentHistory>{
    //es posible que le tenga que hacer parse int al id de historial de pago : paymentHistory.paymentMethodId=parseInt(paymentHistory.paymentMethodId+"");
    return this.http.post<PaymentHistory>(this.urlEndPoint+'/'+idBill,paymentHistory);
  }


}
