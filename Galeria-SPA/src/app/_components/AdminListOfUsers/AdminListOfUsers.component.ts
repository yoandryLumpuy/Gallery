import { ManageUsersService } from './../../_services/ManageUsers.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_model/user.interface';
import { PaginationResult } from 'src/app/_model/paginationResult.interface';
import { QueryObject } from 'src/app/_model/queryObject.interface';

@Component({
  selector: 'app-AdminListOfUsers',
  templateUrl: './AdminListOfUsers.component.html',
  styleUrls: ['./AdminListOfUsers.component.css']
})
export class AdminListOfUsersComponent implements OnInit, OnDestroy {
  availableRoles : string[];
  subscription : Subscription;
  subscriptionToUsers : Subscription;
  paginationResult : PaginationResult<User>;
  queryObject : QueryObject = {
    page: 1,
    pageSize: 10
  };

  constructor(private manageUsersService : ManageUsersService) { }

  ngOnDestroy(): void {
    if (!!this.subscription) this.subscription.unsubscribe();
    if (!!this.subscriptionToUsers) this.subscriptionToUsers.unsubscribe();
  }

  ngOnInit() {
     this.subscription = this.manageUsersService.getAvailableRoles().subscribe(
       res => this.availableRoles = res
     );
     this.subscriptionToUsers = this.manageUsersService.getUsers().subscribe(
       res => this.paginationResult = res
     ); 
  }
}
