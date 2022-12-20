import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Products } from '../Models/products.model';
import { of } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import { CartItem } from '../Models/cartitem.model';
import { Cart } from '../Models/cart.model';



@Injectable({
  providedIn: 'root',

})
export class CartService {

  //An array of Cart Items
  //this will attempt to parse the Cart item entry in sessionStorage but deliver an empty set if nothing is found
  //clarify, the empty set will be comprised of a placeholder product to create a placeholder CartItem, a system that maintains data integrity all over the cart-product system 
  cartItems:CartItem[]=[]
  //BehaviorSubject requires an initial value and stores the current value and emits it to the new subscribers.
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  
  
  constructor() {
    this.cartItems=JSON.parse(sessionStorage.getItem("cart")??JSON.stringify(new CartItem(new Products)));   
    this.computeCartTotals();
  }
  
  computeCartTotals() {
    let totalCartPrice: number = 0;
    let totalQuantityValue: number = 0;

    if (!this.cartItems) {
      totalCartPrice = 0;
      totalQuantityValue = 0;
    }
    
    else {
      try{
      for (let cartItem of this.cartItems) {
        totalCartPrice += (cartItem.quantity ?? 0) * (cartItem.unitPrice ?? 0);
        totalQuantityValue += cartItem.quantity ?? 0;
        console.log(totalQuantityValue);}
      }
      catch{console.log("No Cart Found")}
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalCartPrice);
    this.totalQuantity.next(totalQuantityValue);
  }
  /*getCart():CartItem[]{
    return 
  }*/

  addToCart(cartProduct: Products) {
    
    console.log(cartProduct)
    //convert requested Product to CartItem
    let cartItem: CartItem = new CartItem(cartProduct);
    console.log(cartItem)
    //Object -- sets var to cartItem if already exists
    let existingCartItem;
    try{
    existingCartItem = this.cartItems.find(
      (tempCartItem) => tempCartItem.id === cartItem.id
    );
    console.log(existingCartItem);
    }catch{console.log("cart empty protection activated")}

    if (existingCartItem != undefined) {
      // increment the quantity
      existingCartItem.quantity!++;
    } else {
      // just add the item to the array
      if (!this.cartItems[0]) {
        this.cartItems = [cartItem];
      } else {        
        this.cartItems.push(cartItem);
      }
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
    //this line is responsible for persisting the cart
    sessionStorage.setItem("cart", JSON.stringify(this.cartItems))
  }

  remove(cartItem: CartItem) {
    // get index of the item in the array
    const itemIndex = this.cartItems.findIndex(
      (item) => item.id === cartItem.id
    );

    // if found, remove the item from the array
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();    }
      //this line is responsible for editing the presistent cart
      sessionStorage.setItem("cart", JSON.stringify(this.cartItems))
    
  }

  

}