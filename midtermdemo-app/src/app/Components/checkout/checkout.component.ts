import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartSubtotal = this.cartService.totalPrice
  paymentHandler: any = null;
  itemQuantity: number = 0; 


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems;
    this.invokeStripe();
    console.log(this.cartSubtotal);
  }

  updateCartStatus() {
    // subscribe to the cart totalPrice
    //this.cartService.totalPrice.subscribe((data: number) => (this.cartSubtotal = data));
    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe((data) => (this.itemQuantity = data));

  }

  //Configure Stripe payment connection
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51M8wDWEFgnWSeeLrB8b9f8Wn8LiOKC9Kq7HSdWYyvsuDjzPk93yYq4SfO0F8rsp48Ul03j1kJDKMlPHILLoleW0z00q6ohf09S',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'E-Z Shop',
      description: 'Checkout X items',
      amount: amount * 100,
    });
  }

  //Checks 
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'image.png',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

}
