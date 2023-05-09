export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
    
  };
}
  export interface Order{
    order_id:number;
    current_order:boolean;
    user_id:number;
    user_items:user_items[];
    time_stamp:string;
  }
export interface user_items{
  product_id:number;
  quantity:number;
}
  export interface User{
    user_id:number;
    first_name:string;
    last_name:string;
    password:string;
  
    
  }