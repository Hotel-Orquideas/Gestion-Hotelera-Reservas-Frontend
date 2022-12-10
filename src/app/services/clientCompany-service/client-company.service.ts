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
  getClients(nitCompany:string): Observable<ClientCompany[]> {
    return this.http.get<ClientCompany[]>(this.urlEndPoint+'/'+nitCompany);
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
