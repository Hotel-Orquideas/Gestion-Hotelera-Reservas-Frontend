import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataEmployee } from 'src/app/components/login-components/login/dataEmployee';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint: string = 'http://localhost:3005/management/api/auth/login';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

    /**
   * verificar el login
   * @param DataEmployee 
   * @returns 
   */
     login(data:DataEmployee):Observable<DataEmployee>{
      return this.http.post<DataEmployee>(this.urlEndPoint,data);
    }

    isAuth():boolean{
      
      
      const token=localStorage.getItem('x-token');
  
      if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('x-token')){
        return false;
      }else{
        return true
      }
      
     
      
      
      
     
    }
  

}
