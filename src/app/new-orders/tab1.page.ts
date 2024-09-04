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
  itemList: any = [];
  orderList: any = [];
  user:any;
  credentials:any;
  constructor(private modalCtrl: ModalController) {
    this.credentials = Realm.Credentials.anonymous();
    // this.user =  this.app.logIn(this.credentials);

  }

  app: any = new Realm.App({ id: environment.APP_ID });

  ngOnInit() {
    this.getItems();
    // this.getOrdersData();
  }

  async getItems() {
    // Create an anonymous credential
    // const credentials = Realm.Credentials.anonymous();

    // loginwith email
    // const credentials = Realm.Credentials.emailPassword(environment.APP_EID,environment.APP_PASS);

    // Authenticate the user
    this.user = await this.app.logIn(this.credentials);
    console.log(this.user)
    // `App.currentUser` updates to match the logged in user
    console.assert(this.user.id === this.app.currentUser.id);

    this.itemList = await this.user.functions.getItemsData();
    let orders = await this.user.functions.getOrdersData();
    this.orderList = orders.result;
    console.log(this.orderList);

    
    console.log(this.itemList);


  }

  async getOrdersData(){
    let orders = await this.user.functions.getOrdersData();
    this.orderList = orders.result;
    console.log(this.orderList);

  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: OrderFormComponent,
      initialBreakpoint: 1,
      breakpoints: [0.25, 0.5, 0.75, 1],
      componentProps: { itemList: this.itemList.result }
    });
    modal.present();

    const data = await modal.onWillDismiss();
    if (data.role === 'confirm') {
      console.log(data.data);
      // const user = await this.app.logIn(this.credentials);
      let result = await this.user.functions.insertOrdersData(data.data);
      console.log(result)
      if (result.success) {
        this.orderList.push(data.data);
        console.log(this.orderList)
      }

    }
  }



}
