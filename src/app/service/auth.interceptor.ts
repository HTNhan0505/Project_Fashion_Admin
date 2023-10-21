import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public product: ProductService) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.product.getToken()}`
            }
        });

        return next.handle(req);
    }
}