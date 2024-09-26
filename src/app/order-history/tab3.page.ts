import { Component } from '@angular/core';
import { OrdersDataService } from 'src/services/orders-data.service'
import { ReportService } from 'src/services/report.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  allOrdersData: any = [];
  earningsArray: { day: string, cashEarning: number,onlineEarning:number }[] = [];
  earningsArraySrt: { day: string, cashEarning: number,onlineEarning:number }[] = [];
  reportData: any;

  constructor(    private OrdersDataService:OrdersDataService,
    private reportService: ReportService
  ) { }
  ionViewWillEnter() {
    this.getAllOrdersData();
  }
  ngOnInit() {
    
  }

  async getAllOrdersData(){
    let orders = await this.OrdersDataService.getAllOrdersData();//this.user.functions.getOrdersData();
    this.allOrdersData = await orders.result;
      console.log(this.allOrdersData);
    this.earningsArray = await this.OrdersDataService.totalDayWise(this.allOrdersData);
    this.setEarningData();
  }

  setEarningData() {
    if (this.earningsArray && this.earningsArray.length > 0) {
      // console.log('Before sorting:', this.earningsArray);
  
      // Sort the array by the latest date first (YYYY-MM-DD format works directly with new Date)
      this.earningsArray.sort((a, b) => {
        const dateA = new Date(a.day).getTime();
        const dateB = new Date(b.day).getTime();
  
        // Ensure dates are valid and then sort
        if (!isNaN(dateA) && !isNaN(dateB)) {
          return dateB - dateA; // Sort latest first
        } else {
          console.error('Invalid date detected:', a.day, b.day);
          return 0; // Skip sorting if invalid date
        }
      });
  
      // console.log('After sorting:', this.earningsArray);
  
      // Format the date after sorting
      this.earningsArray.forEach(earning => {
        earning.day = this.formatDate(earning.day);
      });
  
    } else {
      console.error('earningsArray is not initialized or is empty');
    }
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    // Ensure the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date provided to formatDate:', dateString);
      return dateString; // Return the original string if it's invalid
    }
  
    // Format the date as 'Wed 05/09/2024'
    const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${dayOfWeek} ${day}/${month}/${year}`;
  }

  // async downloadExcel(date:string) {
  //   let forDate =  date.substring(4);
  //   const data = await this.reportService.getDayReport(forDate);
  //   console.log(data)
  //   this.reportData = data;
  //   this.reportService.generateExcelReport(this.reportData);
  // }

  // async downloadPDF(date:string) {
  //   let forDate =  date.substring(4);
  //   const data = await this.reportService.getDayReport(forDate);
  //   console.log(data);
  //   this.reportData = data;
  //   this.reportService.generatePDFReport(this.reportData);
  // }

  async downloadReport(format: 'excel' | 'pdf', date: string) {
    // Trim the first four characters from the date
    let forDate = date.substring(4);
  
    // Fetch the data based on the date
    const data = await this.reportService.getDayReport(forDate);
    console.log(data);
  
    // Store the report data
    this.reportData = data;
  
    // Generate the report based on the format
    if (format === 'excel') {
      this.reportService.generateExcelReport(this.reportData);
    } else if (format === 'pdf') {
      this.reportService.generatePDFReport(this.reportData);
    }
  }
  
  // Usage for Excel
  async downloadExcel(date: string) {
    await this.downloadReport('excel', date);
  }
  
  // Usage for PDF
  async downloadPDF(date: string) {
    await this.downloadReport('pdf', date);
  }
  
  
    
}