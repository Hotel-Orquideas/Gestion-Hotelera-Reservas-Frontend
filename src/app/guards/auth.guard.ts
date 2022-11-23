import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/login-service/auth.service';
import decode  from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router){ }

  /*
  canActivate(route: ActivatedRouteSnapshot): boolean{

    const expectedRole=route.data['expectedRole'];
    const token = localStorage.getItem('x-token');



    return true
  }
  */
  
  canActivate(): boolean{
    
    if(!this.authService.isAuth()){

      this.toastr.error('Inicie sesión y vuelva a intentar.', 'Error', {
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['/login'])
      
      return false;
    }else {
      return true;
    }
    
  
    

  }
  


  
}
