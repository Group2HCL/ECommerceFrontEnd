import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/Models/products.model';
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-product-details-user',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponentUser implements OnInit {

  @Input() viewMode = false;

  @Input() currentProduct: Products = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
    image: '',
    id: 0,
    quantity: 0
  };

  isPresent: boolean = false;

  message = '';
  addSuccess = false;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    protected cartService: CartService) { }

  ngOnInit(): void {

    if (this.cartService.cartItems && this.cartService.cartItems.includes(this.currentProduct)) {
      this.isPresent = true;
    }

    if (!this.viewMode) {
      this.message = '';
      this.getProduct(this.route.snapshot.params["id"]);
    }
  }

  getProduct(id: string): void {
    this.productService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  updateProduct(): void {
    this.message = '';

    this.productService.update(this.currentProduct.id, this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This product was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }


  addProduct(id: any): void {
    this.cartService.addToCart(this.currentProduct);
    this.addSuccess = true;
    setTimeout( () => {
      this.addSuccess = false;
    }, 1000);
  }


  /*
  removeProduct(id: any): void{
    this.cartService.removeFromCart(this.currentProduct)
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/products']);
        },
        error: (e) => console.error(e)
      });
  }
*/
}