import { AlertService } from './../../_services/alert.service';
import { Subscription } from 'rxjs';
import { ManageUsersService } from './../../_services/ManageUsers.service';
import { PicturesService } from './../../_services/Pictures.service';
import { Picture } from './../../_model/picture.interface';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommentRequest } from 'src/app/_model/request-comment.interface';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.css']
})
export class PictureCardComponent implements OnInit {
  @Input('picture') picture: Picture;
  @ViewChild('menuTrigger') menuTrigger : MatMenuTrigger;
  commentToPost: CommentRequest = {points: 0, comment: ''};

  constructor(public picturesService : PicturesService, 
    public manageUsersService: ManageUsersService,
    private alertService : AlertService) { }  

  ngOnInit() {
    this.refreshCommentToPost();
  } 

  addComment(){ 
    var observ = this.picturesService.addComment(this.picture.id, this.commentToPost); 
    if (!!observ)  
      var subscription: Subscription = observ.subscribe(
        res => {
          this.picture = res;
          this.refreshCommentToPost();
          this.alertService.success("Successfully commented");
        },
        error => {
          this.refreshCommentToPost();
          this.alertService.error("Error while posting comment!");
        },
        () => subscription.unsubscribe()
      );
    this.closeMenu();   
  }

  refreshCommentToPost(){
    this.commentToPost.points = this.picture.yourComment?.points ?? 0;
    this.commentToPost.comment = this.picture.yourComment?.comment ?? '';
  }

  closeMenu(){
    this.menuTrigger.closeMenu();
  }
}
