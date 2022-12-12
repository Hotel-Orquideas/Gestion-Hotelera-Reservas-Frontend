import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from 'src/app/components/company-components/list-companies/company';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  private urlEndPoint:string= 'https://backend-gestion-hotelera.fly.dev/management/api/company';

  constructor(private http:HttpClient) { }

    /**
   * Se obtiene una lista de todas las empresas registradas
   * @returns lista de empresas
   */
     getCompanies():Observable<Company[]>{
      return this.http.get<Company[]>(this.urlEndPoint);
    }
  
    /**
     * Registrar una empresa en la base de datos
     * @param company 
     * @returns 
     */
    registerCompany(company:Company):Observable<Company>{
      return this.http.post<Company>(this.urlEndPoint,company);
    }
  
    /**
     * Se envía el NIT de la empresa a consultar
     * @param nit
     * @returns Obtener una empresa registrada en base al nit
     */
    getCompany(nit:string):Observable<Company>{
      return this.http.get<Company>(this.urlEndPoint+'/'+nit);
    }
  
    /**
     * Actualizar empresa
     * @param company 
     * @returns 
     */
    updateCompany(company:Company):Observable<Company>{
  
      /** 
  
      const datos={
        "position":`${employee.position}`,
        "name":`${employee.person.name}`,
        "lastName":`${employee.person.lastName}`,
        "typeDocument":`${employee.person.typeDocument}`,
        "document":`${employee.person.document}`,
        "genre":`${employee.person.genre}`,
        "birthdate":`${employee.person.birthdate}`,
        "phoneNumber":`${employee.person.phoneNumber}`,
        "email":`${employee.person.email}`,
        "bloodType":`${employee.person.bloodType}`
      };
  */
      return this.http.put<Company>(this.urlEndPoint+'/'+company.nit,company);
      
     
    }
  
    /**
     * Eliminar empresa
     * @param employee
     */
    deleteCompany(company:Company):Observable<Company>{
      return this.http.patch<Company>(this.urlEndPoint+'/'+company.nit, company);
    }

}
