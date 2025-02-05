import { Component } from '@angular/core';
import { ICategory } from '../../core/interfaces/icategory';
import { BrandService } from '../../core/services/brand.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  constructor(private _BrandsService:BrandService){}
  brandSubscripe:Subscription = new Subscription();
  data:ICategory[] = []
  ngOnInit(): void {
    this.brandSubscripe = this._BrandsService.getAllbrands().subscribe({
      next:(respo)=>{this.data = respo.data},
      error:(err)=>{console.log(err);}
    })
  }

  ngOnDestroy(): void {
    this.brandSubscripe.unsubscribe()
  }
}
