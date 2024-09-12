import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaymentService } from 'src/services/payment.service';

@Component({
  selector: 'app-order-details-card',
  templateUrl: './order-details-card.component.html',
  styleUrls: ['./order-details-card.component.scss'],
})
export class OrderDetailsCardComponent implements OnInit {
  @Input() totalOrders: number = 0;
  @Input() orderData: any;
  @Input() index: any;
  @Output() dataEvent = new EventEmitter<{ arg1: string, arg2: any }>();
  @Output() deleteEvent = new EventEmitter<{ arg1: any }>();
  PaymentMode: boolean = false;
  constructor(private payment: PaymentService) { }

  ngOnInit() {
    // console.log(this.orderData);
    this.PaymentMode = this.orderData.payment_mode === 'cash' ? false : true;
  }

  orderClicked(click: string, data: any, event: any) {
    if (event.target.tagName === 'ION-COL') {
      const arg = { arg1: click, arg2: data }
      this.dataEvent.emit(arg); // Emit event 
    }
  }
  deleteOrder(data: any) {
    const arg = { arg1: data }
    console.log('Delete button clicked');
    this.deleteEvent.emit(arg)
  }
  setPaymentMode(event: any) {
    if (event.target.tagName === 'ION-TOGGLE') {
      const paymentMedium = this.PaymentMode? 'online': 'cash';
      this.payment.setpayment(paymentMedium,this.orderData._id);
    }
  }
}
