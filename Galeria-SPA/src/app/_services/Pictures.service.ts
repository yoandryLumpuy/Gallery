import { PaginationResult } from './../_model/paginationResult.interface';
import { QueryObject } from './../_model/queryObject.interface';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Picture } from '../_model/picture.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

constructor(private http : HttpClient) { }

pictures(page: number, pageSize : number, sortBy? : string,
         isSortAscending?: boolean, userId? : number) : Observable<PaginationResult<Picture>>{
  var queryObject : QueryObject = {
    page,
    pageSize    
  }; 
  if (!!userId) queryObject.userId = userId; 
  if (!!sortBy) queryObject.sortBy = sortBy;
  if (!!isSortAscending) queryObject.isSortAscending = isSortAscending;
            
  return this.http.get<PaginationResult<Picture>>(environment.baseUrl + "pictures?"+ this.queryObjectToString(queryObject));
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
}
