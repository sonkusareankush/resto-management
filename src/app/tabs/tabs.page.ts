import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
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
  ) {
   
  }
  async ngOnInit() {
  }

  async ionViewWillEnter(){
    this.user = await this.authService.user;
    this.role = await this.user.functions.getUserRole(localStorage.getItem('userId'));
    console.log(this.role);
    localStorage.setItem('role', this.role[0].role); // Store the user role 
  }

  logout() {
    this.LogOutService.logOut();
  }

}
