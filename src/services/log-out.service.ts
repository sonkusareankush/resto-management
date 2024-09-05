import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {

  constructor(private authservice:AuthService) { }
  logOut(){
    this.authservice.logout();
  }
}
