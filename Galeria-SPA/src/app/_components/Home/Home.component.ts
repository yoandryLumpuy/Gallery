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
export class HomeComponent implements OnInit, OnDestroy {
  paginationResult : PaginationResult<Picture>;
  queryObject : QueryObject = {
    page: 1,
    pageSize: 5,
    sortBy: 'UpdatedDateTime',
    isSortAscending: false
  };
  subscription: Subscription;

  constructor(private picturesService: PicturesService, private alertService : AlertService) { }

  ngOnDestroy(): void {
    if (!!this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getPictures();
  }

  pageChanged($event: number){
    this.queryObject.page = $event;
    this.getPictures();
  }

  getPictures(){
    if (!!this.subscription) this.subscription.unsubscribe();
    this.picturesService.pictures(this.queryObject).subscribe(
      res => this.paginationResult = res);
  }

}
