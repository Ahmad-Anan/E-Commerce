import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent implements OnInit, OnDestroy{
  constructor(private _Router:Router, private _CartService:CartService){}

subNumberCount!:Subscription;


  /********************************************************************** */


  /************************************************************************* */
cartCounterNav!:number
ngOnInit(): void {
  this._CartService.getLoggedUserCart().subscribe({
    next: (res)=> {this.cartCounterNav = res.numOfCartItems},
    error: (err)=> {console.log(err)},
    complete: ()=> {},
  })
  this.subNumberCount =this._CartService.cartCount.subscribe({
    next: (res)=>{ 
      this.cartCounterNav = res;
    },
    error: (err)=>{console.log(err);},
    complete: ()=>{},
  })
}


signOut():void{
  sessionStorage.removeItem('token')  //sign Out ===> By Remove Token
  this._Router.navigate(['/login'])   // Routing To Another Link Or Page
}



  /************************************************************************* */

  ngOnDestroy(): void {
    this.subNumberCount?.unsubscribe
    
  }



}
