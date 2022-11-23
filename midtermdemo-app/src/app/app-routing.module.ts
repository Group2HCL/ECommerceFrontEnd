import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { CartComponent } from './Components/cart/cart.component';
import { OrdersComponent } from './Components/orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin/products', component: ProductsListComponent },
  { path: 'admin/products/:id', component: ProductDetailsComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login/register', redirectTo: 'register'},
  { path: 'register/login', redirectTo: 'login'},
  { path: 'home/register', redirectTo: 'register'},
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  {path: 'admin/users', component: UserListComponent },
  {path: 'admin/users/:id', component: UserDetailsComponent},
  {path: 'products', component: ProductsListComponentUser},
  {path: 'products/:id', component: ProductDetailsComponentUser},
  {path: 'cart', component: CartComponent},
  {path: 'orders', component: OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
