import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as Realm from "realm-web";
import { OrderFormComponent } from 'src/components/order-form/order-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
// Add your App ID
env = environment.production;
itemList:any=[];
orderList:any=[];

  constructor(private modalCtrl: ModalController) {
    
  }

  app:any = new Realm.App({ id: environment.APP_ID });

  ngOnInit(){
    this.logIn();
  }

  async logIn() {
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();

    // Authenticate the user
    const user = await this.app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    console.assert(user.id === this.app.currentUser.id);

    this.itemList = await user.functions.Get_data();
    console.log( this.itemList);

  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: OrderFormComponent,
      initialBreakpoint:1,
      breakpoints:[ 0.25, 0.5, 0.75, 1],
      componentProps:{ itemList: this.itemList.result}
    });
    modal.present();

    const data = await modal.onWillDismiss();
    if(data.role === 'confirm'){
      this.orderList.push(data.data);
      console.log(this.orderList)
    }
  }



}
