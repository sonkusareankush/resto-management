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
env = environment.data;

  constructor() {
    
  }

  

}
