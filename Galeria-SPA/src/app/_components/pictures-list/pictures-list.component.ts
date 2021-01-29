import { Picture } from './../../_model/picture.interface';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pictures-list',
  templateUrl: './pictures-list.component.html',
  styleUrls: ['./pictures-list.component.css']
})
export class PicturesListComponent implements OnInit { 
  @Input('pictures-list') picturesList : Picture[] = []; 

  breakpoint: number = 1;
  
  constructor() { }

  onResize(event: any){
    this.breakpoint = 
      (event.target.innerWidth < 600 ? 1 
        : event.target.innerWidth < 800 ? 2
        : event.target.innerWidth < 1200 ? 3
        : event.target.innerWidth < 1600 ? 4
        : 5);
  }  

  ngOnInit() {
    this.breakpoint = 
      (window.innerWidth < 600 ? 1 
        : window.innerWidth < 800 ? 2
        : window.innerWidth < 1200 ? 3
        : window.innerWidth < 1600 ? 4
        : 5);
  }  
}
