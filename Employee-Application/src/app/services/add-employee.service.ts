import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddEmployeeService {
  url = '';
  Data: any;
  constructor(private _http: HttpClient) {}
  saveEmployee(emp: string) {
    return this._http.post<any>(this.url, JSON.parse(emp));
  }
}
