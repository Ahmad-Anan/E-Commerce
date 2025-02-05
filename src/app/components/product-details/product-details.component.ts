import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProudctsService } from '../../core/services/proudcts.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProudctsService:ProudctsService, private _CartService:CartService){};
    private readonly _ToastrService = inject(ToastrService)
  

  productId!:string|null;
  productsSubscripe!:Subscription
  // productDetails!:IProduct;
  // productDetails:IProduct = {} as IProduct;
  productDetails:IProduct |null = null;
  /******************************************************************** */
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:1000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  /******************************************************************** */
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(pInfo)=>{this.productId = pInfo.get('p_id')}
    })
    this._ProudctsService.getProudctDetails(this.productId).subscribe({
      next:(res)=>{this.productDetails = res.data},
      error:(err)=>{console.log(err)}
    })
  }

addCartItem(p_id:string){
  this.productsSubscripe = this._CartService.addItemCart(p_id).subscribe({
    next:(res)=>{
      this._CartService.cartCount.next(res.numOfCartItems)
      this._ToastrService.success(res.message,'FreshCart',{timeOut:2000,closeButton:true})
    },
    error:(err)=>{
      console.log(err)
      this._ToastrService.error(err.message,'FreshCart',{timeOut:2000,closeButton:true})
    },
    complete:()=>{},
  })
}



ngOnDestroy(): void {
  this.productsSubscripe.unsubscribe()
}

}
