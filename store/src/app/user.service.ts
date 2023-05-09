import { Injectable } from '@angular/core';
import { Order, Product,User } from './item';
import { Observable, of, tap, map, BehaviorSubject } from 'rxjs';
import { FIREBASE_DB_URL } from './constant';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentSearch:string = ""
  currentUser:User = {} as User
  private items = new BehaviorSubject<Product[]>([]);
  constructor(private http:HttpClient){}
  setUserCart(items:Product[]):void{
    this.items.next(items)
  }
  getUserCart():Observable<Product[]>{
    return this.items.asObservable();
  }
  setUser(user:User){
    this.currentUser = user; 
  }
  getUser():User{
    return this.currentUser;
  }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${FIREBASE_DB_URL}/user.json`).pipe(
      map(users => users.filter(  user => user=== users[users.length - 1]))
    );
  }
  searchCart(term: string): Observable<Product[]> {
    console.log(term);
    if (term === "") { return  this.http.get<Product[]>(`${FIREBASE_DB_URL}/product.json`); }
    return this.http.get<Product[]>(`${FIREBASE_DB_URL}/product.json`).pipe(
      map(products => products.filter(product => product.title.includes(term)))
    );
  }
  loginUser(name:string,password:string  ):Observable<User[]>{
    return this.http.get<User[]>(`${FIREBASE_DB_URL}/user.json`).pipe(
      map(users => users.filter(  user =>  user.first_name === name && user.password === password ))
    );
  }
  //--------------------------orders-------------
  getorderByID(id:number):Observable<Order>{
    return this.http.get<Order>(`${FIREBASE_DB_URL}/order/${id -1 }.json`);
  }
  getLargestOrder():Observable<number>{
    return this.http.get<Order[]>(`${FIREBASE_DB_URL}/order.json`).pipe(
      map(products => products[products.length -1].order_id )
    )
  }
}
