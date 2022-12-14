import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Products } from 'src/app/Models/products.model';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';
import { ProductDetailsComponentUser } from '../product-details-user/product-details.component';

@Component({
  selector: 'app-products-list-user',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponentUser implements OnInit {

  products?: Products[];
  currentProduct: Products = {};
  currentIndex = -1;
  name = '';
  cartProductList: Products[] = this.cartService.cartItems;



  constructor(private productsService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.retrieveProducts();
    this.cartProductList = this.cartService.cartItems;
  }


  retrieveProducts(): void {
    this.productsService.getAll()
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveProduct(product: Products, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  removeAllProducts(): void {
  if(confirm("Are you sure you want to delete the entire inventory?")){
    this.productsService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
    }
  }

  searchName(): void {
    this.currentProduct = {};
    this.currentIndex = -1;

    this.productsService.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  addProduct(id: any): void {
    console.log("Adding item " + id);
    this.cartService.addToCart(id);
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}