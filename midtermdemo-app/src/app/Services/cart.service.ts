import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Products } from '../Models/products.model';

const CART_API = "http://localhost:8181/api/ShoppingCart/shoppingCart";
const PRICE_API = "http://localhost:8181/api/ShoppingCart/shoppingCart/price";
const ADD_API = "http://localhost:8181/api/ShoppingCart/shoppingCart/addProduct";
const REMOVE_API = "http://localhost:8181/api/ShoppingCart/shoppingCart/removeProduct";
const CHECKOUT_API = "http://localhost:8181/api/ShoppingCart/shoppingCart/checkout";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  getCart(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(CART_API);
}

  public addToCart(id: any){
    return this.httpClient.get(`${ADD_API}/${id}`);
  }

  public removeFromCart(id: any){
    return this.httpClient.get(`${REMOVE_API}/${id}`);
  }

  public getPrice(){
    return this.httpClient.get(PRICE_API);
  }

  public getCheckout(){
    return this.httpClient.get(CHECKOUT_API);
  }
}
