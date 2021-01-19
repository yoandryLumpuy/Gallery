import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.loggedIn  
           ?  this.authService.user.pipe(
                take(1),
                exhaustMap(user => {
                    if (!!user) {
                      req = req.clone({
                        params: new HttpParams().set('Authorization', 'Bearer '+ this.authService.token)
                      })
                    }          
                    return next.handle(req);
                }))
            : next.handle(req);   
  }
}
