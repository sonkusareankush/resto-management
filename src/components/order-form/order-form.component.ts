import { Component, Input, input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit { 
  @Input() itemList:any=[];
  orderForm: FormGroup;
  totalPriceBeforeDiscount: number = 0;
  totalPriceAfterDiscount: number = 0;



  ngOnInit(): void {
console.log(this.itemList);
  }
  constructor(private modalCtrl: ModalController) { 
    this.orderForm = new FormGroup({
      customerName: new FormControl('', [Validators.required]),
      items: new FormArray([]),
      notes: new FormControl(''),
      discount: new FormControl(0, [Validators.min(0), Validators.max(100)])
    });
    this.addItem();
          
    // Watch for changes in the form to update the total price
          this.orderForm.valueChanges.subscribe(() => {
            this.calculateTotalPrice();
          });
        
  }



  get items() : FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem() {
    const itemGroup = new FormGroup({
      item_name: new FormControl('', [Validators.required]),
      item_price: new FormControl(0, [Validators.required, Validators.min(0)]),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)])
    });
    this.items.push(itemGroup);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotalPrice(); // Update total price after removing an item

  }

  calculateTotalPrice() {
    const itemsArray = this.items.value;
    this.totalPriceBeforeDiscount = itemsArray.reduce((acc:any, item:any) => {
      return acc + (item.item_price * item.quantity);
    }, 0);

    const discount = this.orderForm.get('discount')?.value || 0;
    this.totalPriceAfterDiscount = this.totalPriceBeforeDiscount * (1 - discount / 100);
  }

  onItemSelected(index: number) {
    const selectedItem = this.itemList.find(
      (      item: { item_name: any; }) => item.item_name === this.items.at(index).get('item_name')?.value
    );
    if (selectedItem) {
      this.items.at(index).get('item_price')?.setValue(selectedItem.item_price);
      this.calculateTotalPrice(); // Update total price when item changes
    }
  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      // console.log('Order submitted:', orderData);
      // console.log('Total Price Before Discount:', this.totalPriceBeforeDiscount);
      // console.log('Total Price After Discount:', this.totalPriceAfterDiscount);
      // Logic to save the order or pass it to another service
      let data = {
        orderData:orderData,
        id: uuidv4(),
        totalPriceBeforeDiscount:this.totalPriceBeforeDiscount,
        totalPriceAfterDiscount:this.totalPriceAfterDiscount,
        createdAt: new Date()
      }
      console.log(data);
       this.modalCtrl.dismiss(data,'confirm');
    } else {
      console.log('Form is invalid');
    }
  }

}
