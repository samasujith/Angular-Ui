import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { GetEmployeeService } from 'src/app/services/get-employee.service';
import { Address } from 'src/app/shared/address';
import { Course } from 'src/app/shared/course';
import { Employee } from 'src/app/shared/employee';
interface Filter {
  name: string;
  value: string;
}
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-find-employee',
  templateUrl: './find-employee.component.html',
  styleUrls: ['./find-employee.component.scss'],
})
export class FindEmployeeComponent {
  typeValue: string = 'text';
  values!: any;
  employee: Employee[] = [];
  paginatedEmployee: Employee[] = [];
  empAddress!: Address;
  users!: any;
  findAll = false;

  url: string = 'http://localhost:8080/api/employee';
  filters: Filter[] | undefined;
  hasError = false;
  isSuccess = false;
  cols!: Column[];

  allFilters: Filter | undefined;
  messages1: Message[] = [{ severity: 'error', summary: 'error', detail: '' }];
  messages2: Message[] = [
    {
      severity: 'success',
      summary: 'success',
      detail: 'Employee fetched Successfully!',
    },
  ];

  ngOnInit() {
    this.filters = [
      { name: 'id', value: 'id' },
      { name: 'firstName', value: 'First Name' },
      { name: 'department', value: 'department' },
      { name: 'course', value: 'course' },
      { name: 'findAll', value: 'findAll' },
    ];
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'firstName', header: 'Name' },
      { field: 'department', header: 'Department' },
      { field: 'experience', header: 'Experience' },
      { field: 'salary', header: 'Salary' },
    ];
  }
  constructor(private getEmployee: GetEmployeeService, public router: Router) {}
  onSubmit(login: any) {
    this.values = login.value;
    switch (this.values.filter.name) {
      case 'id':
        this.findAll = false;
        this.typeValue = 'number';
        break;
      case 'findAll':
        this.findAll = true;
        this.typeValue = 'text';
        break;
      default:
        this.findAll = false;
        this.typeValue = 'text';
        break;
    }
  }
  getResult(login: any) {
    this.employee = [];
    this.paginatedEmployee = [];
    this.url = 'http://localhost:8080/api/employee';
    this.hasError = false;
    this.first = 0;
    this.rows = 0;
    this.isSuccess = false;
    this.values = login.value;
    switch (this.values.filter.name) {
      case 'id':
        console.log('id is clicked');
        this.url += `/${this.values.filtervalue}`;
        console.log(this.url);
        break;
      case 'firstName':
        this.url += `?firstName=${this.values.filtervalue}`;
        break;
      case 'findAll':
        this.url += `/findAll`;
        break;
      case 'department':
        this.url += `/department?deptName=${this.values.filtervalue}`;
        break;
      case 'course':
        this.url += `/course?name=${this.values.filtervalue}`;
        break;
      default:
        this.typeValue = 'text';
        break;
    }

    this.getEmployee.url = this.url;
    console.log(this.typeValue);
    this.onPageChange({ first: 0, page: 1, pageCount: 10, rows: 10 });

    if (this.values.filter.name == 'id') {
      this.getEmployee.getEmployee().subscribe(
        (responseData: any) => {
          console.log(responseData);
          let empCourse: Course[] = [];

          const res = responseData;
          this.empAddress = new Address(
            res.address.street,
            res.address.city,
            res.address.pin
          );
          let courses = res.courseList;
          for (let i = 0; i < courses.length; i++) {
            const tempCourse = new Course(courses[i].courseName);
            empCourse.push(tempCourse);
          }
          const tempEmp = new Employee(
            res.id,
            res.firstName,
            res.lastName,
            res.department,
            res.salary,
            res.experience,
            this.empAddress,
            empCourse
          );
          console.log(tempEmp);
          this.employee.push(tempEmp);
          this.isSuccess = true;
          this.onPageChange({ first: 0, page: 1, pageCount: 10, rows: 10 });
        },
        (error) => {
          this.hasError = true;
          this.messages1[0].detail = error.error.message;
        }
      );
    } else {
      this.getEmployee.getEmployee().subscribe(
        (responseData: any) => {
          for (let j = 0; j < responseData.length; j++) {
            let empCourse: Course[] = [];

            const res = responseData[j];
            this.empAddress = new Address(
              res.address.street,
              res.address.city,
              res.address.pin
            );
            let courses = res.courseList;
            for (let i = 0; i < courses.length; i++) {
              const tempCourse = new Course(courses[i].courseName);
              empCourse.push(tempCourse);
            }
            const tempEmp = new Employee(
              res.id,
              res.firstName,
              res.lastName,
              res.department,
              res.salary,
              res.experience,
              this.empAddress,
              empCourse
            );
            this.employee.push(tempEmp);
            this.isSuccess = true;
          }
          this.onPageChange({ first: 0, page: 1, pageCount: 10, rows: 10 });
        },
        (error) => {
          this.hasError = true;
          this.messages1[0].detail = error.error.message;
        }
      );
    }
    console.log(this.users);
  }
  first: number = 0;
  rows: number = 0;
  totalRecords = 100;
  total!: number;
  onPageChange(event: any) {
    this.paginatedEmployee = [];
    this.total = this.employee.length;
    this.totalRecords = this.total;
    console.log(this.employee.length);
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    this.paginatedEmployee = this.employee.slice(this.first, this.first + 10);
    console.log(this.paginatedEmployee);
  }
}
