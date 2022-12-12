import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../components/client-components/list-clients/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint: string = 'http://54.90.71.67:3005/management/api/client';

  constructor(private http: HttpClient) { }

  /**
   * Se obtiene una lista de todos los clientes registrados
   * @returns lista de clientes
   */
  getClients(): Observable<Client[]> {

    return this.http.get<Client[]>(this.urlEndPoint)
      ;
  }

  /**
   * Registrar un cliente en la base de datos
   * @param client 
   * @returns 
   */
  registerClient(client: Client): Observable<Client> {
    client.document = client.document + "";
    return this.http.post<Client>(this.urlEndPoint, client);
  }

  /**
   * Se envía el documento a consultar
   * @param doc
   * @returns Obtener un solo cliente registrado
   */
  getClient(doc: string): Observable<Client> {
    return this.http.get<Client>(this.urlEndPoint + '/' + doc);
  }

  /**
   * Actualizar cliente
   * @param client
   * @returns 
   */
  updateClient(client: Client): Observable<Client> {

    const data = {
      "name": `${client.person.name}`,
      "lastName": `${client.person.lastName}`,
      "typeDocument": `${client.person.typeDocument}`,
      "document": `${client.person.document}`,
      "genre": `${client.person.genre}`,
      "birthdate": client.person.birthdate,
      "phoneNumber": `${client.person.phoneNumber}`,
      "email": `${client.person.email}`,
      "bloodType": `${client.person.bloodType}`,
      "dateIssuanceDoc": client.dateIssuanceDoc,
      "countryOrigin": `${client.countryOrigin}`,
      "countryDestination": `${client.countryDestination}`,
      "cityOrigin": `${client.cityOrigin}`,
      "cityDestination": `${client.cityDestination}`,
      "profession": `${client.profession}`,
    };

    return this.http.put<Client>(this.urlEndPoint + '/completeInfo/' + client.person.document, data);
  }

  changeStateClients(clients: any): Observable<Client> {
    return this.http.put<Client>(this.urlEndPoint + '/changeState/0', clients);
  }

  /**
   * Eliminar cliente
   * @param client
   */
  deleteClient(doc: string): Observable<Client> {
    return this.http.patch<Client>(this.urlEndPoint + '/' + doc, '');
  }

}
