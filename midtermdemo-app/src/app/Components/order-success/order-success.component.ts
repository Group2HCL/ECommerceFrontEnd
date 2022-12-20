import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/Models/users1.model';
import { OrderService } from 'src/app/Services/order.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor(private orderService: OrderService, private tokenStorageService:TokenStorageService) { }
  user: Users= this.tokenStorageService.getUser();

  ngOnInit(): void {
    console.log("This user has paid for an order "+ this.user.username + " at email " + this.user.email)
    let orderreturn: any=''
    this.orderService.createOrder(this.user.email!).subscribe((x)=> orderreturn=x)
  }

}
