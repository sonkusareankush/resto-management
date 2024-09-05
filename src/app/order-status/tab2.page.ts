import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
import * as Realm from "realm-web";
import { AlertController, ModalController } from '@ionic/angular';
import { AddItemsComponent } from 'src/components/add-items/add-items.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  itemList: any = [];
  user: any ;
  app: any = new Realm.App({ id: environment.APP_ID });


  constructor(  private authService: AuthService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}
  async ionViewWillEnter(){
    // this.getItems();
    this.user = await this.authService.user;
    console.log(this.user);
    if(this.user){
      this.getItems();
    }
  }

  async getItems() {
   
    console.assert(this.user.id === this.app.currentUser.id);

    const item = await this.user.functions.getItemsData();
    this.itemList = item.result;

  }


  async confirmDelete(itemId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete', handler: () => {
            this.deleteItem(itemId);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteItem(itemId: any) {
    // let result = await
    //  this.user.functions.deleteItemsData(itemId);
    // if(result){

    // }
    console.log(itemId.toString());
    const id = {  _id:itemId.toString()}
   const response =  await this.user.functions.deleteItemsData(id);
     console.log(response)
        if (response.success) {
          this.itemList = this.itemList.filter((item:any) => item._id !== itemId);
          this.showAlert('Success', 'Item deleted successfully.');
        } else {
          this.showAlert('Error', response.message);
        }
      }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddItemsComponent,
      initialBreakpoint: 1,
      breakpoints: [0.25, 0.5, 0.75, 1],
      // componentProps: { data:data }
    });
    modal.present();

    const data = await modal.onWillDismiss();
    
  }
}
