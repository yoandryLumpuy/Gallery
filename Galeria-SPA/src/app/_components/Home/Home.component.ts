import { PicturesService } from './../../_services/Pictures.service';
import { Picture } from './../../_model/picture.interface';
import { PaginationResult } from './../../_model/paginationResult.interface';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {
  paginationResult : PaginationResult<Picture>;
  constructor(private http: HttpClient, private picturesService: PicturesService) { }

  ngOnInit() {
    this.picturesService.pictures(1,10).subscribe(
      res => {        
        this.paginationResult = res;
        console.log(res);
      }        
    );
  }

}
