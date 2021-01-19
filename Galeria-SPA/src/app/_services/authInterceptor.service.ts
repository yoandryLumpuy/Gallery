import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, switchMap, take } from 'rxjs/operators';
import { collectExternalReferences } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.loggedIn){
      var header = req.headers;
      if (!header) header = new HttpHeaders();
      header = header.append('Authorization', 'Bearer '+ this.authService.token);                                             
      req = req.clone({headers: header});
    }
    return next.handle(req);
  }
}
