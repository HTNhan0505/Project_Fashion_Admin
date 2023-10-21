import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }
  public getToken() {
    return localStorage.getItem('token');
  }

  addProduct(data: any): Observable<any> {
    return this._http.post('http://192.168.90.101:8000/admin/addproduct', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://192.168.90.101:8000/admin/getlistproduct');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
}
