import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private _HttpClient:HttpClient) { }

  decodedInfo:any;



/******************************************** */
registerUser(userData:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, userData)
}
//****************************************************************************** */
loginrUser(userData:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, userData)
}

//****************************************************************************** */
forgetPassword(userData :object) :Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, userData)
}
resetCode(userData :object) :Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, userData)
}
newPassword(userData :object) :Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, userData)
}


//****************************************************************************** */




saveDecodeUser():void{     //Save Token

  if(sessionStorage.getItem('token') != null){
    this.decodedInfo = jwtDecode(sessionStorage.getItem('token') !)
  }
}


}
