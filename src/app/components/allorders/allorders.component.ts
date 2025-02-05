import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaymentService } from '../../core/services/payment.service';
import { IOrder } from './../../core/interfaces/iorder';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit, OnDestroy {
  orders: IOrder[] = [];
  private allOrdersSubscription!: Subscription;

  constructor(private _paymentService: PaymentService, private _ActivatedRoute: ActivatedRoute) {}

  getOrders(): void {
    const userId = this._ActivatedRoute.snapshot.paramMap.get('id'); 

    if (userId) { 
      this.allOrdersSubscription = this._paymentService.getUserOrders(userId).subscribe({
        next: (data) => {
          this.orders = data; 
          console.log('Orders:', this.orders); 
        },
        error: (err) => {
          console.error('Error fetching orders:', err); 
        },
      });
    } else {
      console.error('User ID not found in route parameters.');
    }
  }

  ngOnInit(): void {
    this.getOrders(); 
  }

  ngOnDestroy(): void {
    if (this.allOrdersSubscription) {
      this.allOrdersSubscription.unsubscribe(); 
    }
  }
}