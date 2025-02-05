import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
constructor(private _FormBuilder:FormBuilder, private _ActivatedRoute:ActivatedRoute, private _PaymentService:PaymentService){}

shippingAddress:FormGroup = this._FormBuilder.group({
        details: [null],
        phone: [null],
        city: [null],
        })

        cartId!:string | null
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (param)=>{this.cartId = param.get('cart_id')}
  })
}

        payOrder():void{
          console.log( this.shippingAddress.value)
          this._PaymentService.checkoutSession(this.cartId, this.shippingAddress.value).subscribe({
            next : (res)=> 
              {
                console.log(res)
                window.open(res.session.url, '_self')
              }
          })
        }

}
