import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateEmployeeService {
  url = 'http://localhost:8080/api/employee/updateSalaryById';

  Data: any;
  constructor(private _http: HttpClient) {}
  updateEmployee(id: number, salary: number) {
    const params = new HttpParams().set('id', id).set('salary', salary);
    return this._http.put<any>(this.url, params);
  }
}
