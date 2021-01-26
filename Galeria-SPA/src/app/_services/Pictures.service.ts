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

pictures(queryObject: QueryObject) : Observable<PaginationResult<Picture>>{              
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

getPictureUrlById(id: number) : string{
  return environment.baseUrl + 'pictures/'+ id.toString();
}
}
