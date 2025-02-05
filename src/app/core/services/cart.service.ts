import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }
  private readonly _HttpClient= inject(HttpClient)
  clientToken:any =  {token : sessionStorage.getItem('token')}


/********************************************************* */
getLoggedUserCart():Observable<any>{ // To Get Or Delete You Need {URL, Headres}
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,{headers :this.clientToken})
}   
/************ */
addItemCart(p_id:string):Observable<any>{ // To Put Or Post You Need {URL,  Body, Headres}
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,{"productId": p_id},{headers :this.clientToken})
} 
/************ */
updateItemCart(p_id:string, count:number):Observable<any>{ // To Put Or Post You Need {URL,  Body, Headres}
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`, {"count": count},{headers :this.clientToken})
}
/************* */
removeItemFromCart(p_id:string):Observable<any>{ // To Get Or Delete You Need {URL, Headres}
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${p_id}`,{headers :this.clientToken})
} 
/********************************************************************************** */
// cartCount!:number;                                           ===> property in service to be global to hold number of cart item but it's static
cartCount:BehaviorSubject<number> = new BehaviorSubject(0)  // ===> property in service to be global to hold number of cart item it's dynamic











}
