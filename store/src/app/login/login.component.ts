import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent implements OnInit {
  first_name = ""
  password=""
  here:string = "nope"
  constructor(
    private router: Router,private user: UserService
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    this.user.loginUser( this.first_name, this.password).subscribe(users =>{
      
      if(users.length === 0 ){
          this.here = "noe";
      }
      else{
        this.user.setUser(users[0]);
        this.router.navigate(["/home/list"]);
      }
    })
  }
}