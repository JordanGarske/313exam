import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Order, User } from '../item';
import { FIREBASE_DB_URL } from '../constant';
import { Location } from '@angular/common';
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
  here:string = "enter data"
  constructor(
    private router: Router,private user: UserService,private http: HttpClient,private location: Location
  ) {}

  ngOnInit() {

    this.user.getUsers().subscribe(items => this.biggestID = items[items.length -1 ].user_id)
  }
  back(){
    this.location.back();
  }
  onSubmit() {
    if(this.first_name !=="" && this.last!==""&&this.password!=="" ){
      this.http.get<User[]>(FIREBASE_DB_URL+'/user.json').subscribe(users=>{
        let contain: boolean = false
        for (let user of users) {
          if(this.first_name === user.first_name  && this.password){
            contain = true ; 
            this.here = 'change the password or name'
          }
        }
        if( !contain){
          this.http.get<Order>(`${FIREBASE_DB_URL}/order.json?orderBy="$key"&limitToLast=1`)
          .subscribe((response) => {
                  let user:User = { user_id: this.biggestID + 1 ,first_name:this.first_name,last_name:this.last, password:this.password };
                  const data:Order = Object.values(response)[0];
                  let userOrder: Order = {current_order:true,time_stamp:"",order_id: data.order_id+1, user_id:user.user_id, user_items:[]};
                  this.http.put<User>(`${FIREBASE_DB_URL}/user/${this.biggestID }.json`, user ).subscribe();  
                  this.http.put<Order>(`${FIREBASE_DB_URL}/order/${data.order_id }.json`, userOrder ).subscribe(B => this.location.back());
          });
        }
        

      })

}  
 else{
      this.here = "please fill out everything";
 }
  }

}
