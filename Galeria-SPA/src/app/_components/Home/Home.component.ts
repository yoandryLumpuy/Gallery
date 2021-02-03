import { AuthService } from './../../_services/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from './../../_services/alert.service';
import { QueryObject, defaultQueryObject } from './../../_model/queryObject.interface';
import { PicturesService } from './../../_services/Pictures.service';
import { Picture } from './../../_model/picture.interface';
import { defaultPaginationResult, PaginationResult } from './../../_model/paginationResult.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit{
  paginationResult : PaginationResult<Picture> = defaultPaginationResult;
  
  queryObject : QueryObject = {
    ...defaultQueryObject,
    sortBy: 'UploadedDateTime',
    isSortAscending: false
  };


  constructor(private picturesService: PicturesService, private alertService : AlertService, 
    private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(
      user => this.getPictures()
    );
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
