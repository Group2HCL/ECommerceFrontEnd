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
  cartItems: CartItem[] = [];
  
  //BehaviorSubject requires an initial value and stores the current value and emits it to the new subscribers.
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);



  constructor() {
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
      for (let cartItem of this.cartItems) {
        totalCartPrice += (cartItem.quantity ?? 0) * (cartItem.unitPrice ?? 0);
        totalQuantityValue += cartItem.quantity ?? 0;
        console.log(cartItem.quantity);
      }
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalCartPrice);
    this.totalQuantity.next(totalQuantityValue);
  }

  addToCart(cartProduct: Products) {
    console.log(cartProduct)
    let cartItem: CartItem = new CartItem(cartProduct);
    console.log(cartItem)
    //Object -- sets var to cartItem if already exists
    let existingCartItem = this.cartItems.find(
      (tempCartItem) => tempCartItem.id === cartItem.id
    );
    console.log(existingCartItem);

    if (existingCartItem != undefined) {
      // increment the quantity
      existingCartItem.quantity!++;
    } else {
      // just add the item to the array
      if (!this.cartItems) {
        this.cartItems = [cartItem];
      } else {
        this.cartItems.push(cartItem);
      }
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
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
  }

  

}