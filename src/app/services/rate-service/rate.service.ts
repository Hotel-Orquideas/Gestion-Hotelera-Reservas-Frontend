import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rate } from 'src/app/components/rate-components/list-rates/rate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private urlEndPoint: string = 'http://localhost:3005/management/api/rate';

  constructor(private http: HttpClient) { }

  /**
   * Se obtiene una lista de todas las tarifas registradas
   * @returns lista de tarifas
   */
   getRates():Observable<Rate[]>{
    return this.http.get<Rate[]>(this.urlEndPoint);
  }

  /**
   * Registrar una traifa en la base de datos
   * @param rate 
   * @returns 
   */
  registerRate(rate:Rate):Observable<Rate>{
    rate.roomTypeId=parseInt(rate.roomTypeId+"");
    return this.http.post<Rate>(this.urlEndPoint,rate);
  }

  /**
   * Se envía el id a consultar
   * @param id
   * @returns Obtener una sola traifa registrada
   */
  getRate(id:number):Observable<Rate>{
    return this.http.get<Rate>(this.urlEndPoint+'/'+id);
  }

  /**
   * Actualizar traifa
   * @param rate 
   * @returns 
   */
  updateRate(rate:Rate):Observable<Rate>{

    const datos={
      "name":`${rate.name}`,
      "value":rate.value,
      "roomTypeId":parseInt(rate.roomTypeId+'')
    }

    return this.http.put<Rate>(this.urlEndPoint+'/'+rate.id,datos);
  }

  /**
   * Eliminar traifa
   * @param rate
   */
  deleteRate(id:number):Observable<Rate>{
    return this.http.delete<Rate>(this.urlEndPoint+'/'+id)
  }

}
