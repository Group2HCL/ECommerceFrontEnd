import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Products } from '../Models/products.model';
import { Observable } from 'rxjs';

const orderConnection = 'http://localhost:8181/api/ShoppingCart/checkout';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  public createOrder (cartContents: Products[]): Observable<any>{  
    let item:Products
cartContents.forEach(value => {console.log(value)      
    })
    console.log("sending order");
    return this.http.post<any>(orderConnection, cartContents, httpOptions);
  }
}
