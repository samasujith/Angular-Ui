import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetEmployeeService {
  url = '';
  Data: any;
  constructor(private _http: HttpClient) {}
  getEmployee() {
    return this._http.get(this.url);
  }
}
