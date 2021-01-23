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
  environment: { production: boolean; baseUrl: string; };
  editingCommentMode : boolean = false;
  commentToPost: any = {};

  constructor() { }  

  ngOnInit() {
    this.environment = environment;
  }

  toggleEditingCommentMode(){
    this.editingCommentMode = !this.editingCommentMode;    
  }

  submitComment(){
    this.toggleEditingCommentMode();
  }

  cancel(){
    this.commentToPost = {};
    this.editingCommentMode = false;
  }
}
