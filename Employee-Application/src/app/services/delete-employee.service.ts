import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeleteEmployeeService {
  url = '';
  Data: any;
  constructor(private _http: HttpClient) {}
  deleteEmployee() {
    return this._http.delete<any>(this.url);
  }
}
