import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from 'src/app/components/room-components/list-rooms/room';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private urlEndPoint: string = 'http://localhost:3005/management/api/room';

  constructor(private http: HttpClient) { }

  /**
   * Se obtiene una lista de todas las habitaciones registradas
   * @returns lista de habitaciones
   */
   getRooms():Observable<Room[]>{
    return this.http.get<Room[]>(this.urlEndPoint);
  }

  /**
   * Registrar una habitacion en la base de datos
   * @param room 
   * @returns 
   */
  registerRoom(room:Room):Observable<Room>{
    
    return this.http.post<Room>(this.urlEndPoint,room);
  }

  /**
   * Se envía el id a consultar
   * @param id
   * @returns Obtener una sola habitacion registrada
   */
  getRoom(id:number):Observable<Room>{
    return this.http.get<Room>(this.urlEndPoint+'/'+id);
  }

  /**
   * Actualizar habitacion
   * @param room 
   * @returns 
   */
  updateRoom(room:Room):Observable<Room>{


    return this.http.put<Room>(this.urlEndPoint+'/'+room.id,room);
  }

  /**
   * Eliminar habitacion
   * @param room
   */
  deleteRoom(id:number):Observable<Room>{
    return this.http.delete<Room>(this.urlEndPoint+'/'+id)
  }

}
