import { Component, Input, OnInit, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { Products } from 'src/app/Models/products.model';
import { Cart } from 'src/app/Models/cart.model';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/Services/products.service';
import { OrderService } from 'src/app/Services/order.service';
import { CartItem } from 'src/app/Models/cartitem.model';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cart: CartItem[] = this.cartService.cartItems;


  productList?: Products[];
  cartSubtotal: number = 0;
  discountTotal: number = 0;
  totalPrice: number = 0;
  @Input() totalQuantity?: number;
  emptyCart = false;



  constructor(private cartService: CartService, private productsService: ProductsService, private orderService: OrderService) { }


  ngOnInit(): void {

    this.retrieveProducts
    this.cart = this.cartService.cartItems
    console.log(this.cart)
    this.updateCartStatus();

  }


  updateCartStatus() {
    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe((data) => (this.cartSubtotal = data));
    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe((data) => (this.totalQuantity = data));

    this.cartService.computeCartTotals();
    console.log("Cart total recomputed.")
  }


  retrieveProducts(): void {
    this.productsService.getAll()
      .subscribe({
        next: (data) => {
          this.productList = data;
        },
        error: (e) => console.error(e)
      });


  }
  /*
  createOrder(cart: any): void {
    console.log("Local component order called")
    this.orderService.createOrder(cart).subscribe(
      res => { console.log(res); }
    );
  }
  */


  //ADD DELETE PRODUCT FROM CART FUNCTION
  deleteItem(item: CartItem) {
    this.cartService.remove(item);
  }
}