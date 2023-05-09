import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Order, Product } from '../item';
import { FIREBASE_DB_URL } from '../constant';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  userOrders: Order[] = [] ; 
  products: Product[] = [] ; 
  constructor(private http:HttpClient ,private user:UserService){}
  ngOnInit(): void {
    this.http.get<Product[]>(`${FIREBASE_DB_URL}/product.json`).subscribe(product => {
      this.products = product 
      this.http.get<Order[]>(`${FIREBASE_DB_URL}/order.json`).subscribe(orders => {
        this.userOrders = orders.filter(
        order=> order.user_id === this.user.getUser().user_id && order.current_order === false)
        console.log(this.userOrders)
      
      })
    }
    )

  }
  getProduct(product_id:number): Product{
    return this.products[product_id - 1 ];

               
  }

}
