import { ConfirmDialogComponent } from './_services/confirm-dialog/confirm-dialog.component';
import { AlertComponent } from './_services/alert/alert.component';
import { AdminListOfUsersComponent } from './_components/AdminListOfUsers/AdminListOfUsers.component';
import { HomeComponent } from './_components/Home/Home.component';
import { MyErrorHandler } from './error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { PictureCardComponent } from './_components/picture-card/picture-card.component';
import { PicturesListComponent } from './_components/pictures-list/pictures-list.component';
import { NavBarComponent } from './_components/navBar/navBar.component';
import { UserWithRolesDirective } from './_directives/userWithRoles.directive';
import { appRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './_services/authInterceptor.service';
import { PaginatorComponent } from './_components/pagination/pagination.component';

import {MatModule} from './_modules/mat.module';

import { MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  declarations: [				
      AppComponent,
      PictureCardComponent,
      PicturesListComponent,
      NavBarComponent,
      UserWithRolesDirective,
      HomeComponent,
      AdminListOfUsersComponent, 
      PaginatorComponent,
      AlertComponent, 
      ConfirmDialogComponent
   ],
  imports: [
    BrowserModule, 
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    appRoutingModule,
    MatModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: MyErrorHandler},
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true
    },
    {provide: MAT_SNACK_BAR_DATA, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
