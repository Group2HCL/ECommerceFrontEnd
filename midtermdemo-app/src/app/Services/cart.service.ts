import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Products } from '../Models/products.model';
import { cartContents } from '../Models/cartcontents.model';
import {of} from 'rxjs';
import { isNgTemplate } from '@angular/compiler';

const CART_API = "http://localhost:8181/api/ShoppingCart/shoppingCart";
const PRICE_API = "http://localhost:8181/api/ShoppingCart/shoppingCart/price";
const ADD_API = "http://localhost:8181/api/ShoppingCart/shoppingCart/addProduct";
const REMOVE_API = "http://localhost:8181/api/ShoppingCart/shoppingCart/removeProduct";
const CHECKOUT_API = "http://localhost:8181/api/ShoppingCart/shoppingCart/checkout";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartContents:Products[] =[]
  detector: Subject<boolean> = new Subject();

  constructor(private httpClient: HttpClient) { }

  getCart(): Observable<cartContents[]> {
    
    console.log("Injectable active")
    return of(this.cartContents);
}

  public addToCart(toAdd: Products){   
      let productExistInCart:Products = null as any;
      // this.cartContents.find((value) => {toAdd.name==value.name});
      // find product by name
      this.cartContents.forEach((index) => {if(index.name==toAdd.name) productExistInCart=index;});
         console.log(productExistInCart)
        if (!productExistInCart) {
          toAdd.num=1; // assign initial "num" property
          this.cartContents.push(toAdd)
          return;
        }else{
          productExistInCart.num!+= 1;}
        console.log(this.cartContents)
           }  

  public removeFromCart(id: Products){
    console.log("removal ID name " + id.name)
    let productExistInCart=this.cartContents.find((value,index): Products|undefined => {if(id.name===value.name){ console.log(value.name); return this.cartContents[index]}return undefined}) ?? new Products();// find product by name, i used nullish coalescing to protect the null
        console.log("this is what removal logic thinks is in the cart " + productExistInCart.name)    
        if (productExistInCart.num!>1) {
          productExistInCart.num!-= 1; //if more than one copy in the cart just reduce one copy
          return;
        }
        this.cartContents.forEach((value,index) => {if(value.name==id.name) this.cartContents.splice(index,1);}); //remove if at last copy 
        console.log(this.cartContents)
      } 
    
  public isPresent(product: Products){
    if(this.cartContents.find((value): Products => {product.name==value.name; return value})!){
      return this.detector.next(true);
    }
    return this.detector.next(false);

  }
  
}