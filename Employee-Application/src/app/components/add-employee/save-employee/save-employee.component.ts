import { Component } from '@angular/core';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { Message } from 'primeng/api';
import { Subscription, interval, timer } from 'rxjs';
import { AddCoursesService } from 'src/app/services/add-courses.service';
import { AddEmployeeService } from 'src/app/services/add-employee.service';
import { Address } from 'src/app/shared/address';
import { Course } from 'src/app/shared/course';
import { Employee } from 'src/app/shared/employee';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.scss'],
})
export class SaveEmployeeComponent {
  constructor(
    private _postEmployee: AddEmployeeService,
    private addCoursesService: AddCoursesService,
    public router: Router
  ) {}
  value = true;
  values: any;
  address!: Address;
  course: Course[] = [];
  tempCourse!: Course;
  employee!: Employee;
  hasError: boolean = false;
  isSuccess: boolean = false;

  error!: string;

  isFetching: boolean = false;
  messages1: Message[] = [
    { severity: 'error', summary: 'error', detail: this.error },
  ];
  messages2: Message[] = [
    { severity: 'success', summary: 'success', detail: this.error },
  ];
  submit(login: any) {
    console.log('form submitted', login.value);
    this.values = login.value;

    if (
      this.values.firstname.length > 0 &&
      this.values.firstname != '' &&
      this.values.course != undefined &&
      this.values.course.length != 0
    ) {
      console.log('button enabled');
      console.log(this.values.course);
      this.value = false;
      console.log(this.values);
    } else {
      this.value = true;
    }
  }

  submitData(login: any) {
    this.hasError = false;
    this.isSuccess = false;
    this.values = login.value;
    this.address = new Address(
      this.values.street,
      this.values.city,
      this.values.pincode
    );
    for (let i = 0; i < this.values.course.length; i++) {
      this.tempCourse = new Course(this.values.course[i].name);
      this.course.push(this.tempCourse);
    }
    console.log(this.courses);
    this.employee = new Employee(
      0,
      this.values.firstname,
      this.values.lastname,
      this.values.department,
      this.values.salary,
      this.values.experience,
      this.address,
      this.course
    );
    console.log(this.employee);
    this.isFetching = true;
    this._postEmployee.url = 'http://localhost:8080/api/employee';
    console.log(this.ObjectToJson(this.employee));
    this._postEmployee.saveEmployee(this.ObjectToJson(this.employee)).subscribe(
      (responseData) => {
        console.log(responseData);
        this.isSuccess = true;
        this.messages2[0].detail = 'Employee saved Successfully';
        this.selectedCountries = [];

        this.loadSpin();
      },
      (Error) => {
        console.log(Error.error.message);
        this.hasError = true;
        this.error = Error.error.message;
        this.messages1[0].detail = this.error;
        this.isFetching = false;
      }
    );
  }
  ObjectToJson(employee: Employee) {
    let val: string = `
        {
            "firstName": "${employee.firstName}",
            "lastName": "${employee.lastName}",
            "salary": "${employee.salary}",
            "department": "${employee.department}",
            "experience": "${employee.experience}",
            "address": {

                "street": "${employee.address.street}",
                "city": "${employee.address.city}",
                "pin": "${employee.address.pincode}"
            },
            "courseList": [`;
    for (let i = 0; i < employee.courses.length; i++) {
      if (i == employee.courses.length - 1) {
        val += `{"courseName": "${employee.courses[i].courseName}"}`;
      } else {
        val += `{"courseName": "${employee.courses[i].courseName}"},`;
      }
    }
    val += ` ]
}`;
    return val;
  }
  des!: Subscription;
  loadSpin() {
    const timeVal = interval(1000);

    this.des = timeVal.subscribe((value) => {
      if (value == 1) {
        this.isFetching = false;
        this.router.initialNavigation();

        this.des.unsubscribe();
      }
      console.log(value);
    });
  }
  courses: any[] | undefined;

  selectedCountries!: any[];

  filteredCountries!: any[];

  ngOnInit() {
    this.courses = this.addCoursesService.getCourses();
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.courses as any[]).length; i++) {
      let course = (this.courses as any[])[i];
      console.log(course.name);
      if (course.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(course);
      }
    }

    this.filteredCountries = filtered;
  }
}
