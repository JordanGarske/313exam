import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FIREBASE_DB_URL } from '../constant';
import { Product } from '../item';

@Component({
  selector: 'app-detail-of-product',
  templateUrl: './detail-of-product.component.html',
  styleUrls: ['./detail-of-product.component.scss']
})
export class DetailOfProductComponent implements OnInit {
  product?: Product;

  constructor(
    private http: HttpClient,
    private user: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<Product>(`${FIREBASE_DB_URL}/product/${id - 1}.json`).subscribe(
      data => 
        this.product = {
          id: data.id,
          title: data.title,
          category: data.category,
          price: data.price,
          description: data.description,
          image: data.image,
          rating: {rate: data.rating.rate, count: data.rating.count}
        }
    );
  }
}
