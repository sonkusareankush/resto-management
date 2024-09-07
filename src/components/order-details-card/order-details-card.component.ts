import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-details-card',
  templateUrl: './order-details-card.component.html',
  styleUrls: ['./order-details-card.component.scss'],
})
export class OrderDetailsCardComponent  implements OnInit {
  @Input() customerName: string = '';
  @Input() totalPriceBeforeDiscount: number = 0;
  @Input() totalPriceAfterDiscount: number = 0;
  @Input() discount: number = 0;
  @Input() orderData:any;
  @Output() dataEvent = new EventEmitter<{ arg1: string, arg2: any }>();
  constructor() { }

  ngOnInit() {}

  orderClicked(event:any,data:any) {
    const arg = {arg1: event, arg2: data}
    this.dataEvent.emit(arg); // Emit event 
  }

}
