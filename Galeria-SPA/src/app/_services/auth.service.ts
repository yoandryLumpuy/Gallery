import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from './../../environments/environment';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  get loggedIn() : boolean{
    var token = localStorage.getItem('token');
    return !!token && !this.helper.isTokenExpired(token);
  }

  get decodedToken(){
    var token = localStorage.getItem('token');
    if (token) {
      return this.helper.decodeToken(token);
    }else {
      return {};
    }
  }

  login(model : {userName: string; password: string}){
    return this.http.post<{token : string}>(environment.baseUrl + 'auth/login', model)
           .pipe(tap(res => localStorage.setItem('token', res.token)));
  }

  register(model : {userName: string; password: string}){
    return this.http.post(environment.baseUrl + 'auth/register', model)
           .pipe(switchMap(res => this.login(model)));
  }

  saveToken(token : string){
    localStorage.setItem('token', token);
  }
}
