import { Picture } from './../_model/picture.interface';
import { CommentRequest } from './../_model/request-comment.interface';
import { AuthService } from './auth.service';
import { PaginationResult } from './../_model/paginationResult.interface';
import { QueryObject } from './../_model/queryObject.interface';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

constructor(private http : HttpClient, private authService: AuthService, 
  private router : Router, private alertService: AlertService) { }

pictures(queryObject: QueryObject) : Observable<PaginationResult<Picture>>{              
  return this.http.get<PaginationResult<Picture>>(environment.baseUrl + "pictures?"+ this.queryObjectToString(queryObject), 
              {reportProgress: true});
}

queryObjectToString(queryObject : any) : string{
  var parts : string[] = [];
  if (!!queryObject){
    for(let prop in queryObject){
      var value = queryObject[prop];
      if (value != null && value != undefined) 
        parts.push(encodeURIComponent(prop) + '='+ encodeURIComponent(queryObject[prop]))
    }
  }
  return parts.join('&');
}

getPictureUrlById(id: number) : string{
  return environment.baseUrl + 'pictures/'+ id.toString();
}

uploadPicture(file: any){
  if (!this.authService.loggedIn) {
    this.router.navigate(['/']);
    this.alertService.error("Please log in!");
    return;
  };

   var decodedToken = this.authService.decodedToken;
   var formData = new FormData(); 
   formData.append('file', file);
   return this.http.post(`${environment.baseUrl}user/${decodedToken.nameid}/pictures`, file);
}

addComment(pictureId: number, commentRequest : CommentRequest){
  if (!this.authService.loggedIn) {
    this.router.navigate(['/']);
    this.alertService.error("Please log in!");
    return null;
  };

  var decodedToken = this.authService.decodedToken;
  return this.http.post<Picture>(`${environment.baseUrl}user/${decodedToken.nameid}/picture/${pictureId}/comment`, commentRequest);
}

uncomment(pictureId: number){
  if (!this.authService.loggedIn) {
    this.router.navigate(['/']);
    this.alertService.error("Please log in!");
    return null;
  };

  var decodedToken = this.authService.decodedToken;
  return this.http.delete<Picture>(`${environment.baseUrl}user/${decodedToken.nameid}/picture/${pictureId}/comment`);
}

modifyFavorite(pictureId: number){
  if (!this.authService.loggedIn) {
    this.router.navigate(['/']);
    this.alertService.error("Please log in!");
    return null;
  };
  
  var decodedToken = this.authService.decodedToken;
  return this.http.post<Picture>(`${environment.baseUrl}user/${decodedToken.nameid}/picture/${pictureId}/favorite`, {});
}
}
