import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
// import { FcmService } from 'src/services/fcm.service';
import { LogOutService } from 'src/services/log-out.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  user: any;
  role:any;

  constructor(
    private LogOutService: LogOutService,
    private authService: AuthService,
    // private fcmService: FcmService
  ) {
   
  }
  async ngOnInit() {
    // console.log("Tabs");
    // this.fcmService.requestPermission();
    // this.fcmService.listenForMessages();
  }

  async ionViewWillEnter(){
    await this.getUserRole();
    // await this.saveFcmTokenToDB();
  }

  async getUserRole(){
    this.user = await this.authService.user;
    this.role = await this.user.functions.getUserRole(localStorage.getItem('userId'));
    console.log(this.role);
    localStorage.setItem('role', this.role[0].role); // Store the user role 
  }

  // async saveFcmTokenToDB(){
  //   this.user = await this.authService.user;
  //   let resultFcm = await this.user.functions.GetExistingFcmToken(localStorage.getItem('userId'));
  //     const existingFcm = resultFcm?.token_FCM;
  //     console.log('existingFcm',existingFcm);
  //     if(existingFcm !== localStorage.getItem('tokenFcmNew') ){
  //       this.user = this.authService.user;
  //       const userId = localStorage.getItem('userId');
  //       const role = localStorage.getItem('role');
  //       const token = localStorage.getItem('tokenFcmNew');
  //       let result = await this.user.functions.saveFcmToken({user_id : userId,token_FCM:token,role:role});
  //       console.log(result);
  //     }
  // }

  logout() {
    this.LogOutService.logOut();
  }

}
