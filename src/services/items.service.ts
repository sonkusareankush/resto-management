import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CommenService } from './commen.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  user: any;
  constructor(private authService:AuthService,
    private loaderService:CommenService) { 
      this.user = this.authService.user;
    }

    async getItems(){
      let result =await this.user.functions.getItemsData();
      return result;
    }
}
