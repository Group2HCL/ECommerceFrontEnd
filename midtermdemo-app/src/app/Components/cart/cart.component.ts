import { Component,Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { Products } from 'src/app/Models/products.model';
import {Cart} from 'src/app/Models/cart.model';
import {cartContents } from 'src/app/Models/cartcontents.model';
import {Observable} from 'rxjs';
import { ProductsService } from 'src/app/Services/products.service';
import { OrderService } from 'src/app/Services/order.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productList ?: Products[];
  cartProductList: any = this.cartService.cartContents;
   
  constructor(private cartService: CartService, private productsService: ProductsService, private orderService: OrderService) {  }
 
  ngOnInit(): void { 
    this.retrieveProducts
    this.cartProductList=this.cartService.cartContents
    console.log(this.cartProductList)  
     }
    
     retrieveProducts(): void {
      let item:any;
      this.productsService.getAll()
        .subscribe({
          next: (data) => {
            this.productList = data;
          },
          error: (e) => console.error(e)
        });
    }  
    createOrder(cart: any): void{
      console.log("Local component order called")
      this.orderService.createOrder(cart).subscribe(
        res=> {console.log(res);}
      );
    }

    //ADD DELETE PRODUCT FROM CART FUNCTION

  
     
  }

