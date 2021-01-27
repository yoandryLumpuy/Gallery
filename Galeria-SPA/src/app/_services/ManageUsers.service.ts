import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuardService } from './../_guards/authGuard.service';
import { PaginationResult } from './../_model/paginationResult.interface';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { User } from './../_model/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

constructor(private http: HttpClient, private authService: AuthService, 
  private router : Router, private alertService: AlertService) { }

getUsers(): Observable<PaginationResult<User>>{
  return this.http.get<PaginationResult<User>>(environment.baseUrl + 'users');
} 

getUser(id: number): Observable<User>{
  return this.http.get<User>(environment.baseUrl + 'users/'+ id);
}

updateRoles(userName : string, roles: string[]){
  return this.http.post(environment.baseUrl + 'admin/editRoles/' + userName, {roles});
}

getAvailableRoles(): Observable<string[]>{
  return this.http.get<string[]>(environment.baseUrl + 'admin/roles');
}

getUrlForUserPhoto(userId : number): string{
  return environment.baseUrl + 'users/' + userId.toString() + '/photo';
}

uploadProfilePhoto(file : any){
  if (!this.authService.loggedIn) {
    this.router.navigate(['/']);
    this.alertService.error("Please log in!");
    return;
  };

   var decodedToken = this.authService.decodedToken;
   var formData = new FormData(); 
   formData.append('file', file);
   return this.http.post(`${environment.baseUrl}users/${decodedToken.nameid}/photo`, file);
}
}
