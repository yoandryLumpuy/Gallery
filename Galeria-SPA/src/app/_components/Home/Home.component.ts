import { PageEvent } from '@angular/material/paginator';
import { AlertService } from './../../_services/alert.service';
import { QueryObject } from './../../_model/queryObject.interface';
import { PicturesService } from './../../_services/Pictures.service';
import { Picture } from './../../_model/picture.interface';
import { PaginationResult } from './../../_model/paginationResult.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {
  paginationResult : PaginationResult<Picture> = {
    totalPages: 0,
    items: [],
    page: 0,
    pageSize: 0,
    totalItems: 0
  };
  
  queryObject : QueryObject = {
    page: 1,
    pageSize: 5,
    sortBy: 'UpdatedDateTime',
    isSortAscending: false
  };
  picture : Picture;

  constructor(private picturesService: PicturesService, private alertService : AlertService) {
    this.getPictures();
   }

  onPageChanged($event: PageEvent){    
    console.log($event);
    this.queryObject.page = $event.pageIndex;
    this.queryObject.pageSize = $event.pageSize;
    this.getPictures();
  }

  getPictures(){    
    var subscription: Subscription 
      = this.picturesService.pictures(this.queryObject).subscribe(
        res => this.paginationResult = res,
        null,
        () => {
          subscription.unsubscribe();
        });
  }
}
