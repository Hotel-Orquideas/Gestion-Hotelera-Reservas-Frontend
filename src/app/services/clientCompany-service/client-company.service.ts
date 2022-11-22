import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientCompany } from 'src/app/components/clientCompany-components/clientCompany';
import { Observable } from 'rxjs';
import { Client } from '../../components/client-components/list-clients/client';

@Injectable({
  providedIn: 'root'
})
export class ClientCompanyService {

  private urlEndPoint: string = 'http://localhost:3005/management/api/clientCompany';


  constructor(private http: HttpClient) { }

/**
 * Se obtiene una lista de todos los clientes registrados en una empresa
 * @returns lista de clientes en empresa
 */
  getClients(idCompany:number): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlEndPoint+'/'+idCompany);
  }

  /**
 * Registrar un cliente en una empresa
 * @param clientCompany 
 * @returns 
 */
  registerClientCompany(clientCompany: ClientCompany): Observable<ClientCompany> {
    return this.http.post<ClientCompany>(this.urlEndPoint + '/' + clientCompany.companyId + '/' + clientCompany.clientId, clientCompany);
  }



}
