import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProudctsService } from '../../core/services/proudcts.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, FormsModule,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{

  private readonly _ProudctsService = inject(ProudctsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  productsData!: IProduct[]; // From Share Global Interface
  categoriestsData!: ICategory[]; // From Share Global Interface
  productSub!:Subscription // Variable Used To Stop Subscribe Product
  categoriesSub!:Subscription // Variable Used To Stop Subscribe Catedories
  searchInputValue:string = '' //Search Input Value

  //*********************************************************************** */
    //        Owl Carousel Module Static
  mainSlider: OwlOptions = {     //Setting Custom Option Owl Carousel
    loop: true,
    mouseDrag: true, // Move Slider By Mouse
    touchDrag: true, // Move Slider By Touch
    autoplay: true,// Move Slider By Automatic
    autoplayTimeout: 2000,// Move Slider By Automatic By Specific Time
    pullDrag: false,
    dots: true, //     Indicators   You Can Name The Button To Right And Left
    navSpeed: 700,
    navText: ['', ''], // You Can Name The Button To Right And Left
    items:1, // Number Of Item Show
    nav: false // To  Close Dots
  }
    //        Owl Carousel Module Dynamic
    categorySlider: OwlOptions = {     //Setting Custom Option Owl Carousel
      loop: true,
      mouseDrag: true, // Move Slider By Mouse
      touchDrag: true, // Move Slider By Touch
      autoplay: true,// Move Slider By Automatic
      autoplayTimeout: 2000,// Move Slider By Automatic By Specific Time
      pullDrag: false,
      dots: true, //     Indicators   You Can Name The Button To Right And Left
      navSpeed: 700,
      navText: ['', ''], // You Can Name The Button To Right And Left
      responsive: { //Media Query To Show Number Of Slider For Each Screen
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
      nav: false // To  Close Dots
    }

  //Call Api Data In Home
  ngOnInit(): void {
    this.productSub = this._ProudctsService.getAllProudcts().subscribe({
      next : (res)=>{this.productsData = res.data},
      error : (err)=>{console.log(err)},
      complete : ()=>{},
    })
    this.categoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next : (res)=>{this.categoriestsData = res.data},
      error : (err)=>{console.log(err)},
      complete : ()=>{},
    })
  }
  /*************************************************************** */  
                     /// Cart Item 
  addCartItem(p_id:string){
    this._CartService.addItemCart(p_id).subscribe({
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
  /*************************************************************** */
///                             After Subscribe
  ngOnDestroy(): void {
    this.productSub?.unsubscribe()  // You Should Stop Observeal ==>  subscribe ... After close Your Component
    this.categoriesSub?.unsubscribe()  // You Should Stop Observeal ==>  subscribe ... After close Your Component
  } 
} 
