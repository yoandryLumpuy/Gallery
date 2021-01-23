import { Picture } from './../../_model/picture.interface';
import { PictureCardComponent } from './../picture-card/picture-card.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pictures-list',
  templateUrl: './pictures-list.component.html',
  styleUrls: ['./pictures-list.component.css']
})
export class PicturesListComponent implements OnInit { 
  @Input('pictures-list') picturesList : Picture[] = []; 
  
  constructor() { }

  ngOnInit() {
  }
}
