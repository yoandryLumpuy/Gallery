import { AdminListOfUsersComponent } from './Components/AdminListOfUsers/AdminListOfUsers.component';
import { AuthGuardService } from './_guards/authGuard.service';
import { PicturesListComponent } from './Components/pictures-list/pictures-list.component';
import { HomeComponent } from './Components/Home/Home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path : '', component:  HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuardService],
    children:[
      {path: 'pictures', component: PicturesListComponent},
      {path: 'admin', component: AdminListOfUsersComponent, data: {roles: ['Admin']}}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

