import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../components/employee-components/list-employees/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  token=localStorage.getItem('x-token'); //se trae el token
  headers = new HttpHeaders({"x-token": this.token}); //se crea el header
  private urlEndPoint:string= 'http://54.90.71.67:3005/management/api/employee';

  constructor(private http:HttpClient) {
   }

  /**
   * Se obtiene una lista de todos los empleados registrados
   * @returns lista de empleados
   */
  getEmployees():Observable<Employee[]>{
    
    return this.http.get<Employee[]>(this.urlEndPoint, { headers: this.headers } )
    ;
  }

  /**
   * Registrar un empleado en la base de datos
   * @param employee 
   * @returns 
   */
  registerEmployee(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.urlEndPoint,employee, { headers: this.headers });
  }

  /**
   * Se envía el documento a consultar
   * @param doc
   * @returns Obtener un solo empleado registrado
   */
  getEmployee(doc:string):Observable<Employee>{
    return this.http.get<Employee>(this.urlEndPoint+'/'+doc, { headers: this.headers });
  }

    /**
   * Se envía el id a consultar
   * @param doc
   * @returns Obtener un solo empleado registrado por id
   */
     getEmployeeById(id:number):Observable<Employee>{
      return this.http.get<Employee>(this.urlEndPoint+'/filterById/'+id, { headers: this.headers });
    }

  /**
   * Actualizar empleado
   * @param employee 
   * @returns 
   */
  updateEmployee(employee:Employee):Observable<Employee>{
    
    const datos={
      "position":`${employee.position}`,
      "state":`${employee.state}`,
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

    return this.http.put<Employee>(this.urlEndPoint+'/'+employee.person.document,datos, { headers: this.headers });
  }

  /**
   * Eliminar empleado
   * @param employee
   */
  deleteEmployee(doc:string):Observable<Employee>{
    return this.http.patch<Employee>(this.urlEndPoint+'/'+doc, null, { headers: this.headers });
  }

}
