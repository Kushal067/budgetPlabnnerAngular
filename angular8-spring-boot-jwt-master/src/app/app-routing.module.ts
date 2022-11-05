import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import {FavoritesComponent} from './favorites/favorites.component';
import {SignupComponent} from './signup/signup.component';
import {MyDetailsComponent} from './my-details/my-details.component';
import {SearchUsersComponent} from './search-users/search-users.component';
import {ToursComponent} from './tours/tours.component';
import {CreateNewTourComponent} from './create-new-tour/create-new-tour.component'
import { AddBillComponent } from './tours/add-bill/add-bill.component';
import { ViewTourDetailsComponent } from './tours/view-tour-details/view-tour-details.component';

const routes: Routes = [
  { path: '', component:ToursComponent,canActivate:[AuthGaurdService] },
  { path: 'login', component: LoginComponent },
  {path:'signup',component:SignupComponent},
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService] },
  { path: 'contacts', component: FavoritesComponent,canActivate:[AuthGaurdService]},
  {path:'search-users',component:SearchUsersComponent,canActivate:[AuthGaurdService]},
  {path:'my-details', component:MyDetailsComponent,canActivate:[AuthGaurdService]},
  {path:'tours', component:ToursComponent,canActivate:[AuthGaurdService]},
  {path:'createTour', component:CreateNewTourComponent,canActivate:[AuthGaurdService]},
  {path:'tours/:id/addBill', component:AddBillComponent, canActivate:[AuthGaurdService]},
  {path:':id/addBill', component:AddBillComponent, canActivate:[AuthGaurdService]},
  {path:'tours/:id/viewDetails', component:ViewTourDetailsComponent, canActivate:[AuthGaurdService]},
  {path:':id/viewDetails', component:ViewTourDetailsComponent, canActivate:[AuthGaurdService]},
  {path:'tours/:id',component:ViewTourDetailsComponent, canActivate:[AuthGaurdService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
