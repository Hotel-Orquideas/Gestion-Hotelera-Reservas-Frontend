import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../list-employees/employee';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {


 

  employee:Employee= new Employee();
  

  constructor(private employeeService:EmployeeService, private router:Router) { }

  ngOnInit(): void {
  }

  register():void{
    console.log(this.employee);
  }

}
