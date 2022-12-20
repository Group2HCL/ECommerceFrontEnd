import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/Models/products.model';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentProduct: Products = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
    image: ''
  };
  
  message = '';

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService:CartService) { }
    
  ngOnInit(): void {
   
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

  deleteAll(): void {
    if(confirm("Are you sure you want to delete all inventory?")){
      this.productService.deleteAll()
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/products']);
          },
          error: (e) => console.error(e)
        });
    }
  }
  deleteProduct(): void {
    if(confirm("Are you sure you want to delete " + this.currentProduct.name +"?")){
    this.productService.delete(this.currentProduct.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/products']);
        },
        error: (e) => console.error(e)
      });
  }
}

  back() {
    this.router.navigateByUrl('admin/products');
  }
}