import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IOrder } from '../interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient:HttpClient) { }
  clientToken: any = {token : sessionStorage.getItem('token')}

checkoutSession(cartId:string|null,shippingData:object):Observable<any>
  {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.url}`, //http://localhost:4200
      {'shippingAddress' : shippingData},
      {headers: this.clientToken}
    )
  }
  getUserOrders(userId: string | null): Observable<IOrder[]> {
    return this._HttpClient.get<IOrder[]>(`${environment.baseUrl}/api/v1/orders/user/${userId}`);
}

}