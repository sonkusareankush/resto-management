import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { CommenService } from './commen.service';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  // user: any;
  // constructor(private messaging: Messaging,
  //   private authService:AuthService,
  //   private commen: CommenService
  // ) {
  // }

  // // Request permission and get token
  // async requestPermission() {
  //   try {
  //     const token = await getToken(this.messaging, {
  //       vapidKey: environment.vapid,
  //     });
  //     if (token) {
  //       console.log('FCM Token New:', token);
  //       localStorage.setItem('tokenFcmNew',token);
  //     } else {
  //       console.log('No registration token available.');
  //     }
  //   } catch (error) {
  //     console.error('Unable to get permission to notify.', error);
  //   }
  // }

  // // Listen for foreground messages
  // listenForMessages() {
  //   if(environment.IsNotification){
  //   onMessage(this.messaging, (payload) => {
  //     console.log('Message received. ', payload);
  //     // Show notification or handle payload
  //   });
  //   }
  //   else{
  //     this.commen.presentToast('Notification Off','secondary')
  //   }
  // }
}
