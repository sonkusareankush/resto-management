import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class CommenService {

  constructor(private loadingController: LoadingController,
    private toastController: ToastController,
    private alertCtrl: AlertController) { }

  loader: any;
  async showLoader(msg = null) {
    this.loader = await this.loadingController.create({
      message: msg ? msg : 'Loading...',
      spinner: 'crescent'
    });

    await this.loader.present();
  }

  stopLoader(val: boolean | string = false) {
    if (val === 'OrderLoad') {

      setTimeout(() => {
        this.loader.dismiss();
      }, 4000);

    }
    if (val === true) {
      this.loader.dismiss();
    }
    else {
      setTimeout(() => {
        this.loader.dismiss();
      }, 1000)
    }

  }

  // Method to create and present a toast
  async presentToast(msg: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000, // Duration in milliseconds
      position: 'bottom', // Position: 'top', 'bottom', or 'middle'
      color: color // Optional color: 'primary', 'secondary', 'danger', etc.
    });
    toast.present();
  }

  async presentAlert(header: string, message: string, buttons: any[] = ['OK']) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: buttons,
    });

    await alert.present();
  }

    // Method to convert string to Title Case
    toTitleCase(str: string): string {
      return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
}
