import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProudctsService } from '../../core/services/proudcts.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit,OnDestroy{

  constructor(private _ProudctsService:ProudctsService,private _CartService:CartService,private _ToastrService: ToastrService){}
  
  productsSubscripe:Subscription = new Subscription();
  addtocartSubscripe:Subscription = new Subscription();
  products:IProduct[] = []



  ngOnInit(): void {
    this.productsSubscripe = this._ProudctsService.getAllProudcts().subscribe({
      next:(respo)=>{ this.products = respo.data},
      error:(err)=>{ console.log(err);}
    })
  }


  addCartItem(id:string){
    this.addtocartSubscripe =this._CartService.addItemCart(id).subscribe({
      next:(res)=>{
        this._CartService.cartCount.next(res.numOfCartItems)
        this._ToastrService.success(res.message,'FreshCart',{timeOut:1000,closeButton:true})
      },
      error:(err)=>{
        console.log(err)
        this._ToastrService.error(err.message,'FreshCart',{timeOut:1000,closeButton:true})
      },
      complete:()=>{},
    })
}

  ngOnDestroy(): void {
    this.productsSubscripe.unsubscribe();
    this.addtocartSubscripe.unsubscribe();
  }
}
