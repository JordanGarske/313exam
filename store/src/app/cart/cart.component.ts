import { Component, OnInit } from '@angular/core';
import { Order, Product } from '../item';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { FIREBASE_DB_URL } from '../constant';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Product[] = [] 
  quantities: number[] = [];
  link: string = "https://storeinfo-58356-default-rtdb.firebaseio.com";
  total:number = 0 
  order: Order = {} as Order 
  constructor(private http: HttpClient, private currentUser: UserService) { }
  
  ngOnInit(): void {
  this.m();
  }
  m():void{
    this.http.get<Order[]>(this.link + '/order.json').subscribe(x => {
      let userOrder = x.filter(order => order.user_id == this.currentUser.getUser().user_id && order.current_order === true);
      let order = userOrder[0];
      this.order = order;
      this.quantities = [];
      order.user_items.forEach(item => this.quantities.push(item.quantity));
      this.http.get<Product[]>(this.link + '/product.json').subscribe(products => {
        this.items = products.filter(prod => this.includesID(order, prod.id));
          this.getTotal();
      })
    })  
  }
  includesID(order: Order, prodID: number): boolean {
    for (let index = 0; index < order.user_items.length; index++) {
      if (order.user_items[index].product_id === prodID) {
        return true;
      }
    }
    return false;
  }

  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].price * this.quantities[i];
    }
    this.total = total
    return total;
  }
  decrementQuantity(index: number) {

      const urlUpdate = `${FIREBASE_DB_URL}/order/${this.order.order_id -1 }.json`;
      this.order.user_items[index].quantity -=1; 
      if(this.order.user_items[index].quantity === 0 ){
         this.order.user_items = this.order.user_items.filter( item => item.quantity != 0 );
      }
      this.http.put<Order>(urlUpdate, this.order).subscribe(worked =>{this.m()});
    }
  orderItems(): void{
    const urlUpdate = `${FIREBASE_DB_URL}/order/${this.order.order_id -1 }.json`;
    this.currentUser.getLargestOrder().subscribe(orderID => {
      let order:Order =  {current_order:true, order_id: orderID + 1 , time_stamp:"",
      user_id: this.currentUser.getUser().user_id,user_items: [] };
      const timeStamp = new Date();
      const formattedTimeStamp = timeStamp.toLocaleString("en-US", { year: "numeric",month: "2-digit", day: "2-digit",  hour: "2-digit", minute: "2-digit",   second: "2-digit",  hour12: false,});  
      this.order.time_stamp = formattedTimeStamp;
      this.order.current_order = false;
      this.http.put<Order>(urlUpdate, this.order).subscribe(x => 

        this.http.post<Order>(`${FIREBASE_DB_URL}/order/${this.order.order_id}.json`, {} ).subscribe(x=>
          this.http.put<Order>(`${FIREBASE_DB_URL}/order/${this.order.order_id}.json`, order ).subscribe()
          )

        );})
  }  
}
