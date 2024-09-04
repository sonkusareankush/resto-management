import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  earningsArray: { day: string, earning: number }[] = [];
  constructor() { }
  ionViewWillEnter(){
    const earningsData = localStorage.getItem('Earning_History');
    if (earningsData) {
      this.earningsArray = JSON.parse(earningsData);
      this.earningsArray.forEach(earning => {
        earning.day = this.formatDate(earning.day);
      });
    }
  }
  ngOnInit() {

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${dayOfWeek} ${day}/${month}/${year}`;
  }
}