import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/login-service/auth.service';
import { DataEmployee } from './dataEmployee';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  dataEmployee:DataEmployee = new DataEmployee();
  /*
  employee={
    "userName":"",
    "password":""
  }
  */

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.dataEmployee.userName);
    this.authService.login(this.dataEmployee).subscribe(
      (response:any) => {
        //console.log(response)
        localStorage.setItem('x-token',response.token);
        this.router.navigate(['/home']); //reemplazar por home
      },
      error =>{
        this.messageService.add({
          severity: 'error', summary: 'Error al iniciar sesión',
          detail: "Usuario o contraseña incorrecto, intente nuevamente.",
          life: 3000
        })
      }
    );
  }

}
