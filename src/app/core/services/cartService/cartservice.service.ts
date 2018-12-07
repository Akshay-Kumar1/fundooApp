import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  constructor(private http:HttpService) { }

  addToCart(body)
  {
    return this.http.jsonPost("/productcarts/addToCart",body)
  }
  getCart(cartId)
  {
    return this.http.jsonGet("/productcarts/getCartDetails/"+cartId)
  }
}
