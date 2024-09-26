import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from './auth.service';
import { CommenService } from './commen.service';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  user: any;

  constructor(private authService: AuthService,
    private loaderService: CommenService) { }
  async getDayReport(dateString: string) {
    this.user = this.authService.user;
    let dateObject = this.convertStringToDate(dateString);
    console.log(dateObject);
    let result = await this.user.functions.dailySaleReport(dateObject);
    return result;
  }
  generateExcelReport(data: any) {
    // Format date to a string for the file name
    const formattedDate = new Date(data.date).toLocaleDateString('en-GB').replace(/\//g, '-'); // Change format if needed

    const itemsData = data.itemsBreakdown.map((item: any, index:any) => ({
      'Sr. No.': index +1,
      'Item Name': item.itemName,
      'Total Quantity Sold': item.totalQuantitySold,
    }));

    const totalData = {
      'Date': formattedDate,
      'Total Items Sold': data.totalItemsSold,
      'Total Earnings':  '₹' + data.totalEarnings,
      'Cash Earnings':  '₹' + data.cashEarnings,
      'Online Earnings':  '₹' + data.onlineEarnings,
    };

    const worksheet = XLSX.utils.json_to_sheet(itemsData);
    const totalsheet = XLSX.utils.json_to_sheet([totalData]);

    const workbook: XLSX.WorkBook = {
      Sheets: { 'Total Report': totalsheet, 'Item Breakdown': worksheet},
      SheetNames: [ 'Total Report','Item Breakdown'],
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
     
     // Save the Excel file with date in the filename
     this.saveAsExcelFile(excelBuffer, `SalesReport_${formattedDate}.xlsx`);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.download = `${fileName}_export_${EXCEL_EXTENSION}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // // PDF generation
  // generatePDFReport(data: any) {
  //   const doc = new jsPDF();  // Correct instantiation

  //   // Title
  //   doc.text('Sales Report', 14, 20);

  //   // Use autoTable plugin for Item Breakdown
  //   autoTable(doc, {
  //     head: [['Sr. No.','Item Name', 'Total Quantity Sold']],
  //     body: data.itemsBreakdown.map((item: any,index:any) => [index + 1,item.itemName, item.totalQuantitySold]),
  //     startY: 30,
  //   });

  //   // Get finalY from lastAutoTable for positioning the next one
  //   const finalY = (doc as any).lastAutoTable?.finalY || 30;  // Safe fallback to 30 if undefined

  //   // Use autoTable plugin for Total Earnings Table
  //   autoTable(doc, {
  //     head: [['Date', 'Total Items Sold', 'Total Earnings', 'Cash Earnings', 'Online Earnings']],
  //     body: [[
  //       data.date,
  //       data.totalItemsSold,
  //       data.totalEarnings,
  //       data.cashEarnings,
  //       data.onlineEarnings
  //     ]],
  //     startY: finalY + 10,  // Place the second table after the first
  //   });

  //   doc.save('SalesReport.pdf');  // Save the PDF
  // }

  // PDF generation
generatePDFReport(data: any) {
// Format date to a string for the file name
  const formattedDate = new Date(data.date).toLocaleDateString('en-GB').replace(/\//g, '-'); // Change format if needed

  const doc = new jsPDF();  // Correct instantiation

  // Title
  doc.text('Sales Report', 14, 20);

  // Use autoTable plugin for Total Earnings Table first
  autoTable(doc, {
    head: [['Date', 'Total Items Sold', 'Total Earnings', 'Cash Earnings', 'Online Earnings']],
    body: [[
      formattedDate,
      data.totalItemsSold,
      'Rs ' +data.totalEarnings,
      'Rs ' +data.cashEarnings,
      'Rs ' +data.onlineEarnings
    ]],
    startY: 30,  // Positioning this table at the top
  });

  // Get finalY from lastAutoTable for positioning the next one
  const finalY = (doc as any).lastAutoTable?.finalY || 30;  // Safe fallback to 30 if undefined

  // Use autoTable plugin for Item Breakdown after the Total Earnings Table
  autoTable(doc, {
    head: [['Sr. No.', 'Item Name', 'Total Quantity Sold']],
    body: data.itemsBreakdown.map((item: any, index: number) => [index + 1, item.itemName, item.totalQuantitySold]),
    startY: finalY + 10,  // Place the second table after the first
  });

  
  // Save the PDF with date in the filename
  doc.save(`SalesReport_${formattedDate}.pdf`);
}


  convertStringToDate(dateString: string) {
    // Split the string into day, month, and year
    const [day, month, year] = dateString.split('/').map(Number);

    // Create a new Date object (Note: month is 0-indexed in JavaScript Date)
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 1);
    let utcDate = date.toISOString();
    return utcDate;
  }
}
