import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {
  model : any = {};
   
  constructor() { }

  ngOnInit() {
  }

  login(){
    console.log(JSON.stringify(this.model) + "88888");
  }
}
