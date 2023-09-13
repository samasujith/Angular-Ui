import { Message } from 'primeng/api/message';
import { AddCoursesService } from './../../../services/add-courses.service';
import { Component } from '@angular/core';
import { UpdateEmployeeService } from 'src/app/services/update-employee.service';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent {
  constructor(private httpClient: UpdateEmployeeService) {}
  id: number = 0;
  salary: number = 0;
  hasError = false;
  isSuccess = false;

  messages1: Message[] = [{ severity: 'error', summary: 'error', detail: '' }];
  messages2: Message[] = [
    {
      severity: 'success',
      summary: 'success',
      detail: 'Employee salary updated Successfully!',
    },
  ];
  submit(form: any) {
    console.log(form);
    this.hasError = false;
    this.isSuccess = false;
    this.id = form.value.id;
    this.salary = form.value.salary;
    this.httpClient.updateEmployee(this.id, this.salary).subscribe(
      (data) => {
        this.isSuccess = true;
      },
      (error) => {
        this.hasError = true;
        console.log(error);
        this.messages1[0].detail = error.error.message;
      }
    );
  }
}
