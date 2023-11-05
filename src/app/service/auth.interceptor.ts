import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { ProductService } from './product.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    refresh = false;
    static accessToken = '';
    constructor(public product: ProductService, private http: HttpClient) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const req = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.product.getToken()}`
            }
        });

        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
            if (err.status === 401 && !this.refresh) {
                this.refresh = true;

                return this.http.post('http://localhost:3000/users/gettoken', { refresh_token: this.product.getRefeshToken() }, { withCredentials: true }).pipe(
                    switchMap((res: any) => {
                        localStorage.setItem('token', res.token)

                        return next.handle(request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${this.product.getToken()}`
                            }
                        }));
                    })
                );
            }
            this.refresh = false;
            return throwError(() => err);
        }));
    }
}