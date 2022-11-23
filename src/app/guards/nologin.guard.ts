import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/login-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router){}

  canActivate(): boolean {

    
    if(this.authService.isAuth()){
      this.toastr.error('Ya tiene una sesión iniciada. Cierre sesión y vuelva a intentar.', 'Error', {
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['/home'])

      return false;
    }else{
      return true;
    }
    

    


  }
  
}
