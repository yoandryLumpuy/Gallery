import { AuthService } from './../../_services/auth.service';
import { AlertifyService } from './../../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {
  model : any = {};  
   
  constructor(private http : HttpClient, 
    private alertify : AlertifyService, 
    public authService : AuthService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model)
    .subscribe(res => {
      this.alertify.success("succesfully logged!");      
    });
  }

  register(){
    this.authService.register(this.model)
    .subscribe(res => {
      this.alertify.success("succesfully register!");      
    });
  }

}
