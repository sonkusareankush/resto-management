import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(private messaging: Messaging) {}

  // Request permission and get token
  async requestPermission() {
    try {
      const token = await getToken(this.messaging, {
        vapidKey: environment.vapid,
      });
      if (token) {
        console.log('FCM Token:', token);
        // You can store the FCM token in your MongoDB Atlas to send targeted notifications
      } else {
        console.log('No registration token available.');
      }
    } catch (error) {
      console.error('Unable to get permission to notify.', error);
    }
  }

  // Listen for foreground messages
  listenForMessages() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
      // Show notification or handle payload
    });
  }
}
