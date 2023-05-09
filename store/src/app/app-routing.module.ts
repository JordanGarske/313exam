import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { HomeComponent } from './home/home.component';
import { DetailOfProductComponent } from './detail-of-product/detail-of-product.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'sign-up', component:SignUpComponent},
  // {path: 'order', component:CartComponent},
  // {path:"list", component:ProductDetailComponent},
  {path:"login", component:LoginComponent},
  // {path:"history", component:OrderHistoryComponent},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: 'order', component:CartComponent},
      {path:"history", component:OrderHistoryComponent},
      {path:"list", component:ProductDetailComponent},
      {path:":id", component:DetailOfProductComponent}

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



  
 }
