import { AdminListOfUsersComponent } from './_components/AdminListOfUsers/AdminListOfUsers.component';
import { HomeComponent } from './_components/Home/Home.component';
import { RouterModule } from '@angular/router';
import { MyErrorHandler } from './error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { PictureCardComponent } from './_components/picture-card/picture-card.component';
import { PicturesListComponent } from './_components/pictures-list/pictures-list.component';
import { NavBarComponent } from './_components/navBar/navBar.component';
import { UserWithRolesDirective } from './_directives/userWithRoles.directive';
import { appRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './_services/authInterceptor.service';

@NgModule({
  declarations: [				
      AppComponent,
      PictureCardComponent,
      PicturesListComponent,
      NavBarComponent,
      UserWithRolesDirective,
      HomeComponent,
      AdminListOfUsersComponent
   ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    appRoutingModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: MyErrorHandler},
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
