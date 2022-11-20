import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientCompany } from 'src/app/components/clientCompany-components/clientCompany';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientCompanyService {

  private urlEndPoint: string = 'http://localhost:3005/management/api/clientCompany';


  constructor(private http: HttpClient) { }

    /**
   * Registrar un cliente en una empresa
   * @param clientCompany 
   * @returns 
   */
     registerPromotion(clientCompany:ClientCompany):Observable<ClientCompany>{
      return this.http.post<ClientCompany>(this.urlEndPoint+'/'+clientCompany.companyId+'/'+clientCompany.clientId,clientCompany);
    }

}
