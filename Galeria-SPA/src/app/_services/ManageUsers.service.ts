import { QueryObject } from './../_model/queryObject.interface';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { PaginationResult } from './../_model/paginationResult.interface';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { User } from './../_model/user.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  constructor(private http: HttpClient, private authService: AuthService, 
    private router : Router, private alertService: AlertService) { }

  getUsers(queryObject : QueryObject): Observable<PaginationResult<User>>{
    var queryParams = new HttpParams();
    queryParams = queryParams.append('page', queryObject.page.toString());
    queryParams = queryParams.append('pageSize', queryObject.pageSize.toString());
    
    return this.http.get<PaginationResult<User>>(environment.baseUrl + 'users', {
      params: queryParams,
      reportProgress: true
    });
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
