import { Component } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  constructor(private _CategoriesService:CategoriesService){}

    categorySubscripe!:Subscription ;
    data:ICategory[] = []
    ngOnInit(): void {
      this.categorySubscripe = this._CategoriesService.getAllCategories().subscribe({
        next:(respo)=>{this.data = respo.data},
        error:(err)=>{console.log(err);}
      })
    }
    ngOnDestroy(): void {
      this.categorySubscripe.unsubscribe()
    }
}
