import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommenService {

  constructor(private loadingController: LoadingController, private toastController: ToastController) { }

  loader: any;
  async showLoader(msg = null) {
    this.loader = await this.loadingController.create({
      message: msg ? msg : 'Loading...',
      spinner: 'crescent'
    });

    await this.loader.present();
  }

  stopLoader(val: boolean = false) {
    if (val) {
      this.loader.dismiss();
    }
    else {
      try {
        setTimeout(() => {
          this.loader.dismiss();
        }, 1500)
      }
      catch (error) {
        setTimeout(() => {
          this.loader.dismiss();
        }, 1500)
      }

    }

  }

  // Method to create and present a toast
  async presentToast(msg:string,color:string='success') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000, // Duration in milliseconds
      position: 'bottom', // Position: 'top', 'bottom', or 'middle'
      color: color // Optional color: 'primary', 'secondary', 'danger', etc.
    });
    toast.present();
  }

}
