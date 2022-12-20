import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/Services/products.service';
import { Products } from 'src/app/Models/products.model';
import { outputAst } from '@angular/compiler';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
 

categories = ["shoes", "shirts", "pants"];

  constructor(private productService: ProductsService ) { }

  ngOnInit(): void {
    //Get all products
    //Extract categories from list
    
  }
}
