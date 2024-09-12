import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CommenService } from './commen.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  user: any;

  constructor(private authService:AuthService,
    private loaderService:CommenService

  ) {
    this.user = this.authService.user;
   }
  async setpayment(mode:string,id:string){
    this.loaderService.showLoader();
    const orderId = {  _id:id.toString()};
    console.log(orderId,mode);
    let result = await this.user.functions.setPaymentMode(orderId,mode);
    if (result.status) {
      console.log(result);
      this.loaderService.presentToast('success')
    } else{
      this.loaderService.presentToast('Failed','danger')
      console.log(result);
    }
    this.loaderService.stopLoader();
  }
}
