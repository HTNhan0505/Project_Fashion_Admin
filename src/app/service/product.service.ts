import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/admin/product/list'
  private token = '5c4242e4-9bf5-11ee-96dc-de6f804954c9';
  constructor(private _http: HttpClient) { }
  public getToken() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token')
    }
    return;
  }
  public getRefeshToken() {
    return localStorage.getItem('refeshToken');
  }

  addProduct(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/admin/product/add', data);
  }
  addCategory(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/admin/add-category', data);
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
    return this._http.get('http://localhost:3000/admin/get-category/list');
  }
  getOrderList(): Observable<any> {
    return this._http.get('http://localhost:3000/admin/orders/get-all-order');
  }
  getSingleOrder(id: any) {
    const url = `http://localhost:3000/admin/order/${id}`;
    return this._http.get<any>(url);
  }
  updateProduct(id: any, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/admin/product/update/${id}`, data);
  }
  updateCategory(id: any, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/admin/update-category/${id}`, data);
  }
  getDelivery(id: any) {
    const url = `http://localhost:3000/admin/order/delivery/${id}`;
    return this._http.get<any>(url);
  }
  confirmOrder(id: any) {
    const apiUrl = `http://localhost:3000/admin/order/confirm/${id}`;
    const body = ""

    return this._http.put(apiUrl, body);
  }
  reportInfo() {
    const url = `http://localhost:3000/admin/report`;
    return this._http.get<any>(url);
  }

  userList() {
    return this._http.get('http://localhost:3000/admin/user/list');
  }

  getSingleUser(id: any) {
    const url = `http://localhost:3000/admin/user/get/${id}`;
    return this._http.get<any>(url);
  }

  updateUser(id: any, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/admin/user/${id}`, data);
  }

  getProvinces() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    });

    return this._http.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', { headers });
  }

  getCities(provinceId: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    });

    const body = {
      "province_id": provinceId
    };

    return this._http.post('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', body, { headers });
  }


  getWard(districtId: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    });

    const body = {
      "district_id": districtId
    };

    return this._http.post('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', body, { headers });
  }

}

