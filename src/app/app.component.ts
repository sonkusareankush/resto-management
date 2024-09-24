import { Component } from '@angular/core';
import { FcmService } from 'src/services/fcm.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private fcmService: FcmService
  ) {}

  ngOnInit() {
    this.fcmService.requestPermission();
    this.fcmService.listenForMessages();
  }
}
