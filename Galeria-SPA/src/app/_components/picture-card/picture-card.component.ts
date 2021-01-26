import { PicturesService } from './../../_services/Pictures.service';
import { environment } from './../../../environments/environment';
import { Picture } from './../../_model/picture.interface';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.css']
})
export class PictureCardComponent implements OnInit {
  @Input('picture') picture: Picture;
  commentToPost: any = {};

  constructor(public picturesService : PicturesService) { }  

  ngOnInit() {
  } 
}
