import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Promotion } from 'src/app/components/promotion-components/list-promotions/promotion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private urlEndPoint: string = 'http://localhost:3005/management/api/promotion';

  constructor(private http: HttpClient) { }

  /**
   * Se obtiene una lista de todas las promociones registradas
   * @returns lista de promociones
   */
   getPromotions():Observable<Promotion[]>{
    return this.http.get<Promotion[]>(this.urlEndPoint);
  }

  /**
   * Registrar una promoción en la base de datos
   * @param promotion 
   * @returns 
   */
  registerPromotion(promotion:Promotion):Observable<Promotion>{
    promotion.companyId=parseInt(promotion.companyId+"");
    return this.http.post<Promotion>(this.urlEndPoint,promotion);
  }

  /**
   * Se envía el id a consultar
   * @param id
   * @returns Obtener una sola promoción registrada
   */
  getPromotion(id:number):Observable<Promotion>{
    return this.http.get<Promotion>(this.urlEndPoint+'/'+id);
  }

  /**
   * Actualizar promoción
   * @param promotion 
   * @returns 
   */
  updatePromotion(promotion:Promotion):Observable<Promotion>{
    promotion.companyId=parseInt(promotion.companyId+"");
    const data={
      "description":`${promotion.description}`,
      "percentage":promotion.percentage,
      "expirationDate":promotion.expirationDate,
      "companyId":parseInt(promotion.companyId+'')
    }

    return this.http.put<Promotion>(this.urlEndPoint+'/'+promotion.id,promotion);
  }

  /**
   * Eliminar promoción
   * @param promotion
   */
  deletePromotion(id:number):Observable<Promotion>{
    return this.http.delete<Promotion>(this.urlEndPoint+'/'+id)
  }

}
