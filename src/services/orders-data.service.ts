import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CommenService } from './commen.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersDataService {
  user: any;
  constructor(private authService:AuthService,
    private loaderService:CommenService) { 
      this.user = this.authService.user;
    }

    async getOrdersData() {
      let todaysOrders = await this.user.functions.getTodaysOrdersData(new Date());
      console.log('todaysOrders', todaysOrders.result);
      return  todaysOrders.result;
    }

    async getAllOrdersData(){
      let result = await this.user.functions.getOrdersData();
      return result;
    }

    totalDayWise(orderData: any) {
      // Create a map to group orders by day and payment mode
      const earningsMap = new Map<string, { cash: number; online: number }>();
    
      orderData.forEach((order: any) => {
        const date = new Date(order.created_At);
        const day = date.toISOString().split('T')[0]; // Get the date string in 'YYYY-MM-DD' format
    
        // Initialize the payment totals for the day if not present
        if (!earningsMap.has(day)) {
          earningsMap.set(day, { cash: 0, online: 0 });
        }
    
        // Get the current totals for the day
        const earningsForDay = earningsMap.get(day)!;
    
        // Differentiate based on payment_mode and sum up the total_Price_AfterDiscount
        if (order.payment_mode === 'cash') {
          earningsForDay.cash += order.total_Price_AfterDiscount;
        } else if (order.payment_mode === 'online') {
          earningsForDay.online += order.total_Price_AfterDiscount;
        }
    
        // Update the map with the new totals
        earningsMap.set(day, earningsForDay);
      });
    
      // Convert the map into an array of objects in the desired format
      const earningsArray = Array.from(earningsMap.entries()).map(([day, earnings]) => ({
        day,
        cashEarning: earnings.cash,
        onlineEarning: earnings.online
      }));
    
      console.log(earningsArray);
      return earningsArray;
    }
    
}
