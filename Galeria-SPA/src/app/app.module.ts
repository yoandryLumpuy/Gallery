import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { PictureCardComponent } from './Components/picture-card/picture-card.component';
import { PicturesListComponent } from './Components/pictures-list/pictures-list.component';
import { NavBarComponent } from './Components/navBar/navBar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [				
    AppComponent,
      PictureCardComponent,
      PicturesListComponent,
      NavBarComponent
   ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
