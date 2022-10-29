import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomType } from 'src/app/components/roomType-components/list-room-types/roomType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  private urlEndPoint: string = 'http://localhost:3005/management/api/roomType';

  constructor(private http: HttpClient) { }

  /**
   * Se obtiene una lista de todos los tipos de habitaciones registradas
   * @returns lista de tipos de habitación
   */
   getRoomTypes():Observable<RoomType[]>{
    return this.http.get<RoomType[]>(this.urlEndPoint);
  }

  /**
   * Registrar un tipo de habitación en la base de datos
   * @param RoomType 
   * @returns 
   */
  registerRoomType(roomType:RoomType):Observable<RoomType>{
    return this.http.post<RoomType>(this.urlEndPoint,roomType);
  }

  /**
   * Se envía el id a consultar
   * @param id
   * @returns Obtener un solo tipo de habitación registrado
   */
  getRoomType(id:number):Observable<RoomType>{
    return this.http.get<RoomType>(this.urlEndPoint+'/'+id);
  }

  /**
   * Actualizar tipo de habitación
   * @param roomType 
   * @returns 
   */
  updateRoomType(roomType:RoomType):Observable<RoomType>{
    return this.http.put<RoomType>(this.urlEndPoint+'/'+roomType.id,roomType);
  }

  /**
   * Eliminar tipo de habitación
   * @param RoomType
   */
  deleteService(id:number):Observable<RoomType>{
    return this.http.delete<RoomType>(this.urlEndPoint+'/'+id)
  }
}
