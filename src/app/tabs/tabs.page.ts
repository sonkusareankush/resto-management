import { Component } from '@angular/core';
import { LogOutService } from 'src/services/log-out.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private LogOutService: LogOutService
  ) {}

  logout() {
    this.LogOutService.logOut();
  }

}
