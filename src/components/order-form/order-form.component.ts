import { Component, Input, input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  @Input() modal: any;
  name: string = "kastkaar";

  ngOnInit(): void {

  }
  constructor(private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
