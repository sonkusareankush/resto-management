import { Component, Input, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {}

}
