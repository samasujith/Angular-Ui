import { Component } from '@angular/core';
import { AddEmployeeService } from 'src/app/services/add-employee.service';
import { GetEmployeeService } from 'src/app/services/get-employee.service';
import { Address } from 'src/app/shared/address';
import { Course } from 'src/app/shared/course';
import { Employee } from 'src/app/shared/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {}
