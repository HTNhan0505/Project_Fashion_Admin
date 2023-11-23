import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/admin/getlistproduct'
  constructor(private _http: HttpClient) { }
  public getToken() {
    return localStorage.getItem('token');
  }
  public getRefeshToken() {
    return localStorage.getItem('refeshToken');
  }

  addProduct(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/admin/addproduct', data);
  }
  addCategory(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/admin/addcategory', data);
  }
  getProductList(pageNumber: number, pageSize: number): Observable<any> {
    const offset = (pageNumber - 1) * pageSize;
    const url = `${this.baseUrl}?offset=${pageNumber}&limit=${pageSize}`;
    return this._http.get<any>(url);
  }
  deleteProduct(id: any): Observable<any> {
    return this._http.delete(`http://localhost:3000/admin/product/delete/${id}`);
  }
  getCategoryList(): Observable<any> {
    return this._http.get('http://localhost:3000/admin/getcategory/list');
  }

  updateProduct(id: any, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/admin/product/update/${id}`, data);
  }
  updateCategory(id: any, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/admin/updatecategory/${id}`, data);
  }

}
