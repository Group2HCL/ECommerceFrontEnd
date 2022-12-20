import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/Models/products.model';
import { Users } from 'src/app/Models/users1.model';
import { ProductsService } from 'src/app/Services/products.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { UsersService } from 'src/app/Services/users1.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private userService: UsersService, private tokenStorageService: TokenStorageService, private productsService:ProductsService) { }
  private orderList:any[]=[]
  private user: Users = this.tokenStorageService.getUser()
  products: Products[]= []
  listlength: number = this.products.length
  pageIndex=0;
  ngOnInit(): void {
    this.productsService.getAll().subscribe((x)=> this.products=x)
    //this.userService.getUserOrders(this.user.username??"").subscribe((x)=> this.orderList=x)
  }
  handlePageEvent(e:PageEvent){
    this.pageIndex=e.pageIndex
  }


}
