import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Order, User } from '../item';
import { FIREBASE_DB_URL } from '../constant';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  first_name = ""
  last= ""
  password=""
  private biggestID:number =  0; 
  here:string = "nope"
  constructor(
    private router: Router,private user: UserService,private http: HttpClient
  ) {}

  ngOnInit() {

    this.user.getUsers().subscribe(items => this.biggestID = items[0].user_id)
  }

  onSubmit() {
    let  order_id  = 2;
    let user:User = { user_id: this.biggestID,first_name:this.first_name,last_name:this.last, password:this.password };
     this.http.post<User>(`${FIREBASE_DB_URL}/user/${order_id}.json`, {} ).subscribe(item =>
      
      this.http.put<Order>(`${FIREBASE_DB_URL}/user/${order_id}.json`, user ).subscribe()
      
      );
  }
}
