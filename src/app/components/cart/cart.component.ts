import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit,OnDestroy{
  constructor(private  _CartService:CartService){}
  getCartSub!: Subscription;
  // cartData: ICart = {} as ICart;
  cartData: ICart | null = null;

ngOnInit():void {
  this.getCartSub = this._CartService.getLoggedUserCart().subscribe({
    next:(res)=>{this.cartData = res.data},
    error:(err)=>{console.log(err)},
    complete:()=>{}
  })
}

removeItem(p_id:string){
  this._CartService.removeItemFromCart(p_id).subscribe({
    next:(res)=>{
      this._CartService.cartCount.next(res.numOfCartItems)
      this.cartData = res.data
    },
    error:(err)=>{console.log(err)},
    complete:()=>{}
  })
}

updataeQuant(p_id:string,count:number){
  if (count > 0){
    this._CartService.updateItemCart(p_id, count).subscribe({
      next:(res)=>{this.cartData = res.data},
      error:(err)=>{console.log(err)},
      complete:()=>{}
    })
  }
}

ngOnDestroy(): void {
  this.getCartSub?.unsubscribe()
  
}





}
