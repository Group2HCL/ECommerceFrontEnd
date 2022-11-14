import { Component,Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { Products } from 'src/app/Models/products.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

   cart: any;
   
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
   this.cart = this.cartService.getCart();
    
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
