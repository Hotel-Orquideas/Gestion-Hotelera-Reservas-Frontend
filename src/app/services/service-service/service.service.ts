import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/app/components/service-components/list-services/service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private urlEndPoint: string = 'https://backend-gestion-hotelera.fly.dev/management/api/service';

  constructor(private http: HttpClient) { }

  /**
   * Se obtiene una lista de todos los servicios registrados
   * @returns lista de servicios
   */
   getServices():Observable<Service[]>{
    return this.http.get<Service[]>(this.urlEndPoint);
  }

  /**
   * Registrar un servicio en la base de datos
   * @param service 
   * @returns 
   */
  registerService(service:Service):Observable<Service>{
    return this.http.post<Service>(this.urlEndPoint,service);
  }

  /**
   * Se envía el id a consultar
   * @param id
   * @returns Obtener un solo servicio registrado
   */
  getService(id:number):Observable<Service>{
    return this.http.get<Service>(this.urlEndPoint+'/'+id);
  }

  /**
   * Actualizar servicio
   * @param service 
   * @returns 
   */
  updateService(service:Service):Observable<Service>{
    return this.http.put<Service>(this.urlEndPoint+'/'+service.id,service);
  }

  /**
   * Eliminar servicio
   * @param service
   */
  deleteService(id:number):Observable<Service>{
    return this.http.delete<Service>(this.urlEndPoint+'/'+id)
  }


}
