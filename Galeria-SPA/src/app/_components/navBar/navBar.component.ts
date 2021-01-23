import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from './../../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent{
  model : any = {};  
   
  constructor(private http : HttpClient,
    public authService : AuthService) { }

  login(){
    this.authService.login(this.model)
    .subscribe(res => {
      //this.alertify.success("successfully logged!");      
    });
  }

  register(){
    this.authService.register(this.model)
    .subscribe(res => {
      //this.alertify.success("successfully registered!");      
    });
  }

  logout(){
    this.authService.logout();
    //this.alertify.success("Successfully loggued out!")
  }

}
