import { Component, ViewChild } from '@angular/core';
import { AlertController, IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import * as Realm from "realm-web";
import { OrderFormComponent } from 'src/components/order-form/order-form.component';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
import { CommenService } from 'src/services/commen.service';
import { ItemsService } from 'src/services/items.service';
import { OrdersDataService } from 'src/services/orders-data.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  env = environment.production;
  itemList: any = [];
  orderList: any = [];
  // allOrdersData: any = [];
  user: any;
  credentials: any;
  modal: any; // to reference the current modal

  constructor(private modalCtrl: ModalController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private commenService:CommenService,
    private OrdersDataService:OrdersDataService,
    private items:ItemsService

  ) {
    // this.credentials = Realm.Credentials.anonymous();
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
  async ionViewWillEnter() {
    // this.getItems();
    this.user = await this.authService.user;
    console.log(this.user);
    if (this.user) {
      this.getItems();
    }
  }

  async getItems() {
    try{
    this.commenService.showLoader();
    // Create an anonymous credential
    // const credentials = Realm.Credentials.anonymous();

    // `App.currentUser` updates to match the logged in user
    console.assert(this.user.id === this.app.currentUser.id);
    await this.getOrdersData();
    this.itemList = await this.items.getItems();//this.user.functions.getItemsData();
    // let orders = await this.OrdersDataService.getAllOrdersData();//this.user.functions.getOrdersData();
    // this.allOrdersData = await orders.result;
    //   console.log(this.allOrdersData);

    this.sortOrderList();
    // this.OrdersDataService.totalDayWise(this.allOrdersData);
    console.log(this.itemList);
    }
    catch(error){
      console.log(error);
    }
    finally{
      this.commenService.stopLoader('OrderLoad');
    }
  }
  sortOrderList() {
    this.orderList.sort((a: { created_At: string | number | Date; }, b: { created_At: string | number | Date; }) => {
      return new Date(b.created_At).getTime() - new Date(a.created_At).getTime();
    });
  }

  async getOrdersData() {
    // let todaysOrders = await this.user.functions.getTodaysOrdersData(new Date());
    this.orderList =await this.OrdersDataService.getOrdersData();
    // console.log('todaysOrders',  this.orderList);

  }

  async openModal(dataToEdit: any) {
    const modal = await this.modalCtrl.create({
      component: OrderFormComponent,
      initialBreakpoint: 1,
      breakpoints: [0.25, 0.5, 0.75, 1],
      componentProps: { itemList: this.itemList.result, dataToEdit: dataToEdit }
    });
    modal.present();

    const data = await modal.onWillDismiss();
    if (data.role === 'new_Order') {
      this.commenService.showLoader();
      console.log(data.data);
      // const user = await this.app.logIn(this.credentials);
      let result = await this.user.functions.insertOrdersData(data.data);
      console.log(result)
      if (result.success) {
        this.orderList.push(data.data);
        await this.getOrdersData();
        this.sortOrderList();
        // this.OrdersDataService.totalDayWise(this.allOrdersData);
        this.commenService.presentToast('success')
      }     
      else{
        this.commenService.presentToast('Failed','danger')
      } 
    }

    if (data.role === 'updated_Order') {
      this.commenService.showLoader();
      console.log(data.data);
      const id = { _id: data.data._id.toString() }
      let result = await this.user.functions.updateSingleOrder(id, data.data);
      console.log("Order Updated", result)
      if (result.status) {

        // Update the local copy of the order in your order list
        const updatedOrder = data.data; // This is the updated order data from the model
        const index = this.orderList.findIndex((order: any) => order.id === updatedOrder.id);

        if (index !== -1) {
          // Replace the old order data with the updated data
          this.orderList[index] = updatedOrder;
        }
        console.log("updated OrderList", this.orderList)
        this.sortOrderList();
        // this.OrdersDataService.totalDayWise(this.allOrdersData);
        this.commenService.presentToast('success')
      }
      else{
        this.commenService.presentToast('Failed','danger')
      }
    }
    this.commenService.stopLoader();
  }




  editOrder(event: any) {
    // console.log("order card event",event.arg1,event.arg2);
    if (event.arg1 == "clicked") {
      this.openModal(event.arg2);
    }
  }



  async confirmDelete(event: any) {
    this.commenService.presentAlert(
    'Confirm Delete',
    'Are you sure you want to delete this Order?',
     [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
           handler: () => {
            this.deleteOrder(event);
          }
        }
      ]
    );
  }

  async deleteOrder(event: any) {
    this.commenService.showLoader();
    console.log(event)
    const id = {  _id:event.arg1._id.toString()}

    console.log(id);
   const response =  await this.user.functions.deleteSingleOrder(id);
     console.log(response);
        if (response.status) {
          this.commenService.stopLoader(true);
          this.commenService.presentAlert('Success', 'Order deleted successfully.');
          this.orderList = this.orderList.filter((order:any) => order.id !== event.arg1.id);
        } else {
          this.commenService.stopLoader(true);
          this.commenService.presentAlert('Error', response.message);
        }
      }
}
