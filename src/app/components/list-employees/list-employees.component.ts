import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from './employee';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees:Employee[]= new Array;


  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      employee=>this.employees=employee
    );
  }
  
  delete(employee:Employee):void{
    this.employeeService.deleteEmployee(employee.document).subscribe(
      emp=>this.employeeService.getEmployees().subscribe(
        response=>this.employees=response
      )
    );
  }

}
