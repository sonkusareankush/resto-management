import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommenService {

  constructor(private loadingController: LoadingController) { }
   loader:any;
  async showLoader(msg=null) {
    this.loader = await this.loadingController.create({
      message: msg? msg :'Loading...',
      spinner: 'crescent'
    });

    await this.loader.present();
  }

  stopLoader(val:boolean=false){
    if(val){
      this.loader.dismiss();
    }
    else{
      setTimeout(()=>{
        this.loader.dismiss();
      },1000)  
    }
    
  }

}
