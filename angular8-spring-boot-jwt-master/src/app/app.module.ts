import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-interceptor.service';
import { MatSelectModule} from '@angular/material/select';
import { IgxAvatarModule,
	IgxFilterModule,
	IgxIconModule,
	IgxListModule,
	IgxInputGroupModule,
  IgxButtonGroupModule,
  IgxDividerModule } from 'igniteui-angular';
  import { MatSidenavModule, MatIconModule, MatButtonModule,MatExpansionModule } from '@angular/material';

import { FavoritesComponent } from './favorites/favorites.component';
import { SignupComponent } from './signup/signup.component';
import { MyDetailsComponent } from './my-details/my-details.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import {OrderByPipe} from './pipes/order-by.pipe';
import { ToursComponent } from './tours/tours.component';
import { SortTourPipe } from './pipes/sort-tour.pipe';
import { CreateNewTourComponent } from './create-new-tour/create-new-tour.component';
import { AddBillComponent } from './tours/add-bill/add-bill.component';
import { ViewTourDetailsComponent } from './tours/view-tour-details/view-tour-details.component';
import { ColumnTotalPipe } from './pipes/column-total.pipe';
import { ReversePipe } from './pipes/reverse.pipe'


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    FavoritesComponent,
    SignupComponent,
    MyDetailsComponent,
    SearchUsersComponent,
    OrderByPipe,
    ToursComponent,
    SortTourPipe,
    CreateNewTourComponent,
    AddBillComponent,
    ViewTourDetailsComponent,
    ColumnTotalPipe,
    ReversePipe,

  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IgxAvatarModule,
    IgxFilterModule,
    IgxIconModule,
    IgxListModule,
    IgxInputGroupModule,
    IgxButtonGroupModule,
    IgxDividerModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
