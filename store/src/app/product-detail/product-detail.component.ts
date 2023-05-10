import { Component, OnInit } from '@angular/core';
import { Order, Product } from '../item';
import { HttpClient } from '@angular/common/http';
import { FIREBASE_DB_URL } from '../constant';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  title = 'store';
  items:Product[] = [];
  constructor(private http:HttpClient ,private user:UserService){}
  ngOnInit(): void {
    this.user.searchCart("").subscribe(items => this.user.setUserCart(items));
    this.user.getUserCart().subscribe(col=> this.items = col);
  }
addToCart(product:Product) {
  const url = `${FIREBASE_DB_URL}/${product.id -1}.json`;
  const urlCurrentOrder = `${FIREBASE_DB_URL}/order.json`;
  this.http.get<Order[]>(urlCurrentOrder).subscribe(orders => {
    let x = orders.filter(order => order.user_id === this.user.getUser().user_id && order.current_order === true)[0];
    
    const urlUpdate = `${FIREBASE_DB_URL}/order/${x.order_id -1 }.json`;
    if(x.user_items){
      this.newOrderItem(x, product.id )
      
    }
    else{
      x.user_items =[];
      x.user_items.push({product_id: product.id, quantity: 1})
    }
    this.http.put<Order>(urlUpdate, x).subscribe(worked =>console.log(worked));
  });
}
newOrderItem(order:Order,prodID: number): Order {
   order.user_items =  order.user_items.filter(item => item != null);
  for (let index = 0; index < order.user_items.length; index++) {
 
    if(order.user_items[index]){
    if(   order.user_items[index].product_id === prodID){
      order.user_items[index].quantity += 1; 
      return order;
    }
  }
  }

  order.user_items.push({product_id: prodID, quantity: 1});
   order.user_items =  order.user_items.sort((a, b) => a.product_id - b.product_id);
   return order;
}
}
