import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProudctsService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProudcts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
  }
  getProudctDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}
