import { Component,Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { Products } from 'src/app/Models/products.model';
import {Cart} from 'src/app/Models/cart.model';
import { cartContents } from 'src/app/Models/cartcontents.model';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart={};
   
  constructor(private cartService: CartService) {  }
 
  ngOnInit(): void { 
    console.log("ran in contructor")
  this.retrieveCartContents();  
 
     }
    
  

  retrieveCartContents(): void {    
    this.cartService.getCart()
      .subscribe({
        next: (data) => {
          this.cart.items = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
 

  
  checkOut(): void {
    this.cartService.getCheckout()
    .subscribe({
      next: (res: any) => {
        console.log(res);
        console.log("Checked Out");
      },
      error: (e) => console.error(e)
    });
  }

}
