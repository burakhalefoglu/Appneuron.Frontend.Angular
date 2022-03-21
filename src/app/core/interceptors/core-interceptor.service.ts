import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerInformationService } from '@core/services/customer-information.service';
import { LocalStorageService } from '../services/local-storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CoreInterceptorService implements HttpInterceptor {
  constructor(
    private customerInformationService: CustomerInformationService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // var lang = localStorage.getItem("lang") || "tr-TR"

    if (!req.url.endsWith('api/Auth/login')) {
      const token = this.localStorageService.getItem('token');

      req = req.clone({
        // url: req.url.replace('http://', 'https://'),
        setHeaders: {
          // 'Accept-Language': lang,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          Authorization: `Bearer ${token}`,
        },
        responseType: req.method === 'DELETE' ? 'text' : req.responseType,
      });
    }

    const httpsReq = req.clone({
      url: req.url.replace('http://', 'https://'),
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.message === undefined) {
          return;
        }
        if (error.status === 401) {
            this.router.navigate(['/auth']);
        }
        if (error.status === 403) {
            this.router.navigate(['/dashboard']);
        }
        const message = error.message.slice(
          error.message.indexOf(': ') + 1,
          error.message.length
        );
        const errorMessage = `Error: ${message}`;
        this.customerInformationService.showError(errorMessage);

        if (error.error instanceof ErrorEvent) {
          // client-side error
          this.customerInformationService.showError(errorMessage);
        } else {
          // server-side error
          // TODO: Hata mesajları RxJs ile error handling servisine gönderilecek.
        }
        return throwError(errorMessage);
      })
    );
  }
}
