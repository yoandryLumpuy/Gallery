import { RouterModule } from '@angular/router';
import { MyErrorHandler } from './error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PictureCardComponent } from './Components/picture-card/picture-card.component';
import { PicturesListComponent } from './Components/pictures-list/pictures-list.component';
import { NavBarComponent } from './Components/navBar/navBar.component';
import { UserWithRolesDirective } from './_directives/userWithRoles.directive';
import { routes } from './myRoutes.routing';

@NgModule({
  declarations: [				
      AppComponent,
      PictureCardComponent,
      PicturesListComponent,
      NavBarComponent,
      UserWithRolesDirective
   ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: ErrorHandler, useClass: MyErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
