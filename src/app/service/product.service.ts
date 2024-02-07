import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://blawol.onrender.com/admin/product/list'
  constructor(private _http: HttpClient) { }
  public getToken() {
    return localStorage.getItem('token');
  }
  public getRefeshToken() {
    return localStorage.getItem('refeshToken');
  }

  addProduct(data: any): Observable<any> {
    return this._http.post('https://blawol.onrender.com/admin/product/add', data);
  }
  addCategory(data: any): Observable<any> {
    return this._http.post('https://blawol.onrender.com/admin/add-category', data);
  }
  getProductList(pageNumber: number, pageSize: number): Observable<any> {
    const offset = (pageNumber - 1) * pageSize;
    const url = `${this.baseUrl}?offset=${pageNumber}&limit=${pageSize}`;
    return this._http.get<any>(url);
  }
  deleteProduct(id: any): Observable<any> {
    return this._http.delete(`https://blawol.onrender.com/admin/product/delete/${id}`);
  }
  getCategoryList(): Observable<any> {
    return this._http.get('https://blawol.onrender.com/admin/get-category/list');
  }
  getOrderList(): Observable<any> {
    return this._http.get('https://blawol.onrender.com/admin/orders/get-all-order');
  }
  updateProduct(id: any, data: any): Observable<any> {
    return this._http.put(`https://blawol.onrender.com/admin/product/update/${id}`, data);
  }
  updateCategory(id: any, data: any): Observable<any> {
    return this._http.put(`https://blawol.onrender.com/admin/update-category/${id}`, data);
  }

}
