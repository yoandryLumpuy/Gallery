import { User } from './../_model/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from './../../environments/environment';
import {switchMap, tap} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
  user : Subject<User> = new Subject<User>();
  timeoutTimer : any;

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
    return this.http.post<{token : string; user: User}>(environment.baseUrl + 'auth/login', model)
           .pipe(tap(res => {
             this.user.next(res.user);
             localStorage.setItem('token', res.token); 
             localStorage.setItem('user', JSON.stringify(res.user));  
             this.autologout();                         
            }));
  }

  register(model : {userName: string; password: string}){
    return this.http.post(environment.baseUrl + 'auth/register', model)
           .pipe(switchMap(res => this.login(model)));
  }

  logout(){
    this.user.next(undefined);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (!!this.timeoutTimer) clearTimeout(this.timeoutTimer);
  }

  autologout(){
    var token = localStorage.getItem('token');
    if (!token || !this.helper.getTokenExpirationDate(token) || this.helper.isTokenExpired(token)) 
    {
      if (!!this.timeoutTimer) clearTimeout(this.timeoutTimer);
      return;
    }
     
    this.timeoutTimer = setTimeout(() => this.logout(),
    (this.helper.getTokenExpirationDate(token) as Date).getTime() - new Date().getTime());
  }

  autologin(){
    var token = localStorage.getItem('token');
    if (!token || this.helper.isTokenExpired(token)) return;

     var userFromLocalStorage = localStorage.getItem('user'); 
     if (!userFromLocalStorage) return;

     var userClientApp : User = JSON.parse(userFromLocalStorage);     
     if (!userClientApp) return;
     
     this.user.next(userClientApp);
  }

  matchRoles(roles: string[] = []) : boolean{
    var thereIsMatch = false;
    var decodedToken = this.decodedToken;

    if (!decodedToken) return false;
    var rolesFromDecodedToken = decodedToken.role as Array<string>;

    for(const item of roles)
      if (rolesFromDecodedToken.includes(item)) 
        return true;
        
    return false;
  }
}
 