import { defaultQueryObject } from './../../_model/queryObject.interface';
import { ProgressSpinnerService } from './../../_services/progress-spinner.service';
import { ManageUsersService } from './../../_services/ManageUsers.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_model/user.interface';
import { defaultPaginationResult, PaginationResult } from 'src/app/_model/paginationResult.interface';
import { QueryObject } from 'src/app/_model/queryObject.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-AdminListOfUsers',
  templateUrl: './AdminListOfUsers.component.html',
  styleUrls: ['./AdminListOfUsers.component.css']
})
export class AdminListOfUsersComponent implements OnInit, OnDestroy {
  availableRoles : string[];
  subscription : Subscription;
  subscriptionToUsers : Subscription;
  paginationResult : PaginationResult<User> = defaultPaginationResult;
  queryObject : QueryObject = defaultQueryObject;  

  displayedColumns: string[] = ['id', 'userName', 'roles'];
  dataSource = new MatTableDataSource(this.paginationResult.items);  

  constructor(private manageUsersService : ManageUsersService,
    public progressSpinnerService : ProgressSpinnerService) { }

  ngOnDestroy(): void {
    if (!!this.subscription) this.subscription.unsubscribe();
    if (!!this.subscriptionToUsers) this.subscriptionToUsers.unsubscribe();
  }

  ngOnInit() {
     this.subscription = this.manageUsersService.getAvailableRoles().subscribe(
       res => this.availableRoles = res
     );
     this.subscriptionToUsers = this.manageUsersService.getUsers(this.queryObject).subscribe(
       res => this.paginationResult = res
     ); 
  } 
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


