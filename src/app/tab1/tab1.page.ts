import { Component } from '@angular/core';
import * as Realm from "realm-web";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
// Add your App ID
env = environment.production;

  constructor() {
    
  }

  app:any = new Realm.App({ id: environment.APP_ID });

  ngOnInit(){
    this.logIn();
  }

  async logIn() {
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();

    // Authenticate the user
    const user = await this.app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    console.assert(user.id === this.app.currentUser.id);

    const data = await user.functions.Get_data();
    console.log(data);

  }



}
