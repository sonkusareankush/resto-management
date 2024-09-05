import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as Realm from "realm-web";
import { OrderFormComponent } from 'src/components/order-form/order-form.component';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';

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
  user: any ;
  credentials: any;
  constructor(private modalCtrl: ModalController,
    private authService: AuthService
  ) {
    this.credentials = Realm.Credentials.anonymous();
    // this.user =  this.app.logIn(this.credentials);

  }

  app: any = new Realm.App({ id: environment.APP_ID });

  async ngOnInit() {

    // console.log(this.user)
    // this.getItems();
    // this.getOrdersData();

    // this.user = await this.authService.user;
    // console.log(this.user)

  }
  async ionViewWillEnter(){
    // this.getItems();
    this.user = await this.authService.user;
    console.log(this.user);
    if(this.user){
      this.getItems();
    }
  }

  async getItems() {
    // Create an anonymous credential
    // const credentials = Realm.Credentials.anonymous();

    // `App.currentUser` updates to match the logged in user
    console.assert(this.user.id === this.app.currentUser.id);

    this.itemList = await this.user.functions.getItemsData();
    // let orders = await this.user.functions.getOrdersData();
    let todaysOrders = await this.user.functions.getTodaysOrdersData(new Date()); 
    // this.orderList = orders.result;//AllOrders
    this.orderList = todaysOrders.result;

    // console.log('All Orders',orders);
    console.log('todaysOrders',todaysOrders);

    this.sortOrderList();
    this.totalDayWise();



    console.log(this.itemList);


  }
  sortOrderList() {
    this.orderList.sort((a: { created_At: string | number | Date; }, b: { created_At: string | number | Date; }) => {
      return new Date(b.created_At).getTime() - new Date(a.created_At).getTime();
    });
  }

  async getOrdersData() {
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
        this.sortOrderList();
        this.totalDayWise();
      }

    }
  }


  totalDayWise() {

    // Create a map to group orders by day
    const earningsMap = new Map<string, number>();

    this.orderList.forEach((order:any) => {
      const date = new Date(order.created_At);
      const day = date.toISOString().split('T')[0]; // Get the date string in 'YYYY-MM-DD' format

      // Calculate the sum of total_Price_AfterDiscount for each day
      if (earningsMap.has(day)) {
        earningsMap.set(day, earningsMap.get(day)! + order.total_Price_AfterDiscount);
      } else {
        earningsMap.set(day, order.total_Price_AfterDiscount);
      }
    });

    // Convert the map into an array of objects in the desired format
    const earningsArray = Array.from(earningsMap.entries()).map(([day, earning]) => ({
      day,
      earning
    }));

    console.log(earningsArray);
    localStorage.setItem('Earning_History', JSON.stringify(earningsArray));

  }

  logout() {
    this.authService.logout();
  }

}
