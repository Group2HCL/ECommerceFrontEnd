import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/Models/products.model';
import { ProductsService } from 'src/app/Services/products.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products?: Products[];
  currentProduct: Products = {};
  currentIndex = -1;
  name = '';
  myControl = new FormControl('');
  options: string[] = this.getAllProductNames();
  filteredOptions?: Observable<string[]>;
  


  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.retrieveProducts();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  getAllProductNames(): string[] {
   let newish:string[]=[""];
    this.productsService.getAll()
      .subscribe({
        next: (data) => {
           newish.push(data.values.name);
          console.log(data);
        }, 
        error: (e) => console.error(e)
      });
      return newish;

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
    this.productsService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
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

}