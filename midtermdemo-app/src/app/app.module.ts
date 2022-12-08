import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSlideToggleModule,  } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import {LoginComponent} from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { BoardAdminComponent } from './Components/board-admin/board-admin.component';
import { BoardUserComponent } from './Components/board-user/board-user.component';
import { UserDetailsComponent } from './Components/user-details/user-details.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { ProductDetailsComponentUser } from './Components/product-details-user/product-details.component';
import { ProductsListComponentUser } from './Components/products-list-user/products-list.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import { authInterceptorProviders } from './Helper/auth.interceptor';
import { CartComponent } from './Components/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './Components/orders/orders.component';
import {OktaAuth} from '@okta/okta-auth-js';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
const config = {
  issuer: 'https://dev-15967023.okta.com/oauth2/default',
  clientId: '0oa7g3ezwtgJdUgM05d7',
  redirectUri: 'http://localhost:4200/login/callback',
  scopes: ['openid', 'profile']
}
const oktaAuth = new OktaAuth(config);
@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductDetailsComponent,
    ProductsListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    UserDetailsComponent,
    UserListComponent,
    ProductDetailsComponentUser,
    ProductsListComponentUser,
    CartComponent,
    OrdersComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule, 
    ReactiveFormsModule,
    OktaAuthModule,
    
  ],
  providers: [authInterceptorProviders,{provide: OKTA_CONFIG, useValue:{oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
