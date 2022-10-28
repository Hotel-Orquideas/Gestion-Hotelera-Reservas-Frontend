import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/app/components/service-components/list-services/service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private urlEndPoint: string = 'http://localhost:3005/management/api/service';

  constructor(private http: HttpClient) { }

  /**
   * Se obtiene una lista de todos los servicios registrados
   * @returns lista de empleados
   */
   getEmployees():Observable<Service[]>{
    return this.http.get<Service[]>(this.urlEndPoint);
  }

  /**
   * Registrar un servicio en la base de datos
   * @param service 
   * @returns 
   */
  registerEmployee(service:Service):Observable<Service>{
    return this.http.post<Service>(this.urlEndPoint,service);
  }

  /**
   * Se envía el id a consultar
   * @param doc
   * @returns Obtener un solo servicio registrado
   */
  getEmployee(id:number):Observable<Service>{
    return this.http.get<Service>(this.urlEndPoint+'/'+id);
  }

  /**
   * Actualizar servicio
   * @param service 
   * @returns 
   */
  updateEmployee(service:Service):Observable<Service>{
    return this.http.put<Service>(this.urlEndPoint+'/'+service.id,service);
  }

  /**
   * Eliminar servicio
   * @param service
   */
  deleteEmployee(id:number):Observable<Service>{
    return this.http.delete<Service>(this.urlEndPoint+'/'+id)
  }


}
