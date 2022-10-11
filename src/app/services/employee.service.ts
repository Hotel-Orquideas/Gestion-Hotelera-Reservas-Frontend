import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../components/list-employees/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private urlEndPoint:string= 'http://localhost:3005/management/api/employee';

  constructor(private http:HttpClient) { }

  /**
   * Se obtiene una lista de todos los empleados registrados
   * @returns lista de empleados
   */
  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.urlEndPoint);
  }

  /**
   * Registrar un empleado en la base de datos
   * @param employee 
   * @returns 
   */
  registerEmployee(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.urlEndPoint,employee);
  }

  /**
   * Se envía el documento a consultar
   * @param doc
   * @returns Obtener un solo empleado registrado
   */
  getEmployee(doc:string):Observable<Employee>{
    return this.http.get<Employee>(this.urlEndPoint+'/'+doc);
  }

  /**
   * Actualizar empleado
   * @param employee 
   * @returns 
   */
  updateEmployee(employee:Employee):Observable<Employee>{
    console.log("llego: "+employee.id+" "+ employee.person.document);
    return this.http.put<Employee>(this.urlEndPoint+'/'+employee.person.document,employee);
  }

  /**
   * Eliminar empleado
   * @param employee
   */
  deleteEmployee(doc:string):Observable<Employee>{
    return this.http.patch<Employee>(this.urlEndPoint+'/'+doc,null);
  }

}
