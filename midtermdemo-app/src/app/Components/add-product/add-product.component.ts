import {Component } from '@angular/core';
import { Products } from 'src/app/Models/products.model';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
    product: Products ={
        name: '',
        category: '',
        price: 0,
        stock: 0,
        description: ''
    };
    submitted = false;

    constructor(private productsService: ProductsService) { }

    saveProduct(): void {
        const data = {
            name: this.product.name,
            category: this.product.category,
            price: this.product.price,
            stock: this.product.stock,
            description: this.product.description
        };

        this.productsService.create(data)
        .subscribe({
            next: (res) => {
                console.log(res);
                this.submitted = true;
            },
            error: (e) => console.error(e)
        });
    }

    newProduct(): void {
        this.submitted = false;
        this.product = {
            name: '',
            category: '',
            price: 0,
            stock: 0,
            description: ''
        };
    }
}