import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Products } from '../Models/products.model';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { CartItem } from '../Models/cartitem.model';


const orderConnection = 'http://localhost:8181/api/ShoppingCart/checkout';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const reduceUrl='http://localhost:8181/api/User'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private standingOrder: CartItem[]=[]
  constructor(private http: HttpClient,private cartservce:CartService) { }

  public createOrder (username: string): Observable<any>{  
    let item:Products
    this.standingOrder.forEach(value => {console.log(value)      
    })
    console.log("sending order");
    return this.http.post<any>(`${orderConnection}/${username}`, window.sessionStorage.getItem("order"), httpOptions);
  }
  
  public getAllOrders(): Observable<any>{
    return this.http.get(reduceUrl+'/orders');
  }
  public setStandingOrder(cart: CartItem[]): void{
    this.standingOrder=cart;
    window.sessionStorage.setItem("order", JSON.stringify(this.standingOrder))
  }
  
}
