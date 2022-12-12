import { HttpClient } from '@angular/common/http';
import { PaymentMethod } from 'src/app/components/payment-method-components/list-payment-methods/paymentMethod';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private urlEndPoint: string = 'http://54.90.71.67:3005/management/api/paymentMethod';

  constructor(private http: HttpClient) { }

    /**
   * Se obtiene una lista de todos los tipos de habitaciones registradas
   * @returns lista de tipos de habitación
   */
     getPaymentMethods():Observable<PaymentMethod[]>{
      return this.http.get<PaymentMethod[]>(this.urlEndPoint);
    }
  
    /**
     * Registrar un tipo de habitación en la base de datos
     * @param RoomType 
     * @returns 
     */
    registerPaymentMethod(paymentMethod:PaymentMethod):Observable<PaymentMethod>{
      return this.http.post<PaymentMethod>(this.urlEndPoint,paymentMethod);
    }
  
    /**
     * Se envía el id a consultar
     * @param id
     * @returns Obtener un solo tipo de habitación registrado
     */
    getPaymentMethod(id:number):Observable<PaymentMethod>{
      return this.http.get<PaymentMethod>(this.urlEndPoint+'/'+id);
    }
  
    /**
     * Actualizar tipo de habitación
     * @param roomType 
     * @returns 
     */
    updatePaymentMethod(paymentMethod:PaymentMethod):Observable<PaymentMethod>{
      return this.http.put<PaymentMethod>(this.urlEndPoint+'/'+paymentMethod.id,paymentMethod);
    }
  
    /**
     * Eliminar tipo de habitación
     * @param RoomType
     */
    deletePaymentMethod(id:number):Observable<PaymentMethod>{
      return this.http.delete<PaymentMethod>(this.urlEndPoint+'/'+id)
    }

}
