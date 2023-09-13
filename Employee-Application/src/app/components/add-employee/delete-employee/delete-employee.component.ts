import { Component } from '@angular/core';
import { Message } from 'primeng/api/message';
import { DeleteEmployeeService } from 'src/app/services/delete-employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss'],
})
export class DeleteEmployeeComponent {
  constructor(private httpClient: DeleteEmployeeService) {}
  notEmpty = true;
  hasError = false;
  isSuccess = false;
  messages1: Message[] = [{ severity: 'error', summary: 'error', detail: '' }];
  messages2: Message[] = [
    {
      severity: 'success',
      summary: 'success',
      detail: 'Employee Deleted Successfully!',
    },
  ];
  onChange(val: any) {
    this.hasError = false;
    this.isSuccess = false;
    if (val.form.value.id != null) {
      this.notEmpty = false;
    } else {
      this.notEmpty = false;
    }
  }

  onSubmit(val: any) {
    this.httpClient.url = `http://localhost:8080/api/employee/${val.form.value.id}`;
    this.httpClient.deleteEmployee().subscribe(
      (responseData: any) => {
        this.isSuccess = true;
      },
      (error) => {
        this.messages1[0].detail = error.error.message;
        console.log(error.error.message);
        this.hasError = true;
      }
    );
    console.log(val);
  }
}
