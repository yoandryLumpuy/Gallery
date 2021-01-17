import { AdminListOfUsersComponent } from './_components/AdminListOfUsers/AdminListOfUsers.component';
import { AuthGuardService } from './_guards/authGuard.service';
import { PicturesListComponent } from './_components/pictures-list/pictures-list.component';
import { HomeComponent } from './_components/Home/Home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', component: HomeComponent}, 
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuardService],
    children:[
      {path: 'pictures', component: PicturesListComponent},
      {path: 'admin', component: AdminListOfUsersComponent, data: {roles: ['Admin']}},
    ]
  },  
  {path: '**', redirectTo: '', pathMatch: 'full'}       
];

@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class appRoutingModule {}


