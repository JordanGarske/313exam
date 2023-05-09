import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent {
  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  search(phrase: string): void {
    this.userService.searchCart(phrase).subscribe(products => {
      console.log(products)
      this.userService.setUserCart(products);
      this.router.navigate(['home/list']);
    });
  }
}
