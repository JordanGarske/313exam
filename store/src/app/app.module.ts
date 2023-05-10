import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductListComponent } from './product-detail/product-detail.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component'; 
import { MatListModule } from '@angular/material/list';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { DetailOfProductComponent } from './detail-of-product/detail-of-product.component';
import { MatGridListModule } from '@angular/material/grid-list';
@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductListComponent,
    SearchProductComponent,
    LoginComponent,
    SignUpComponent,
    OrderHistoryComponent,
    HomeComponent,
    DetailOfProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatGridListModule
  ],
  providers: [
    AuthGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
