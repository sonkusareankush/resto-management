import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
import { AddItemsComponent } from '../add-items/add-items.component';
import * as Realm from "realm-web";
import { CommenService } from 'src/services/commen.service';


@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss'],
})
export class ManageItemsComponent  implements OnInit {
  itemList: any = [];
  user: any ;
  app: any = new Realm.App({ id: environment.APP_ID });
  
  constructor( private authService: AuthService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
  private loaderService:CommenService) { }

  async ngOnInit() {
        console.log("oninnit manageItems");
          this.getItems();
  }

  async getItems() {
    this.loaderService.showLoader();
    this.user = await this.authService.user;
    // console.log(this.user);
    if(this.user){
    console.assert(this.user.id === this.app.currentUser.id);

    const item = await this.user.functions.getItemsData();
    this.itemList = item.result;
    }
    this.loaderService.stopLoader();
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
    this.loaderService.showLoader();
    console.log(itemId.toString());
    const id = {  _id:itemId.toString()}
   const response =  await this.user.functions.deleteItemsData(id);
     console.log(response);
        if (response.success) {
          this.loaderService.stopLoader(true);
          this.itemList = this.itemList.filter((item:any) => item._id !== itemId);
          this.showAlert('Success', 'Item deleted successfully.');
        } else {
          this.loaderService.stopLoader(true);
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
      initialBreakpoint: 0.5,
      breakpoints: [0.25, 0.5, 0.75, 1],
      // componentProps: { data:data }
    });
    modal.present();

    const data = await modal.onWillDismiss();
    if(data.role == "confirm"){
      this.getItems();
    }
  }
}

