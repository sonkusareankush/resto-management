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
  @Input() itemList: any = [];
  @Input() dataToEdit: any;
  orderForm: FormGroup;
  totalPriceBeforeDiscount: number = 0;
  totalPriceAfterDiscount: number = 0;

  constructor(private modalCtrl: ModalController) {
    this.orderForm = new FormGroup({
      customer_Name: new FormControl('New Customer', [Validators.required]),
      items: new FormArray([],Validators.required),
      notes: new FormControl(''),
      discount: new FormControl(0, [Validators.min(0), Validators.max(100)])
    });


  }
  ngOnInit(): void {
    // console.log(this.itemList);
    console.log(this.dataToEdit);

        // If default values are provided, patch them to the form
    if (this.dataToEdit) {
      this.orderForm.patchValue({
        customer_Name: this.dataToEdit.order_Data.customer_Name || '',
        notes: this.dataToEdit.order_Data.notes || '',
        discount: this.dataToEdit.order_Data.discount || 0
      });

      // Initialize items if any are provided in the default values
      if (this.dataToEdit.order_Data.items && this.dataToEdit.order_Data.items.length > 0) {
        this.dataToEdit.order_Data.items.forEach((item: any) => {
          this.addItemWithValues(item);
        });
      }
    }
    else{
      this.addItem();
    }
// ///////////////////////////////////////////
    // Watch for changes in the form to update the total price
    this.orderForm.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
  }



  get items(): FormArray {
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

  addItemWithValues(item: any) {
    const itemGroup = new FormGroup({
      item_name: new FormControl(item.item_name, [Validators.required]),
      item_price: new FormControl(item.item_price, [Validators.required, Validators.min(0)]),
      quantity: new FormControl(item.quantity, [Validators.required, Validators.min(1)])
    });
    this.items.push(itemGroup);
    this.calculateTotalPrice();
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotalPrice(); // Update total price after removing an item

  }

  calculateTotalPrice() {
    const itemsArray = this.items.value;
    this.totalPriceBeforeDiscount = itemsArray.reduce((acc: any, item: any) => {
      return acc + (item.item_price * item.quantity);
    }, 0);

    const discount = this.orderForm.get('discount')?.value || 0;
    this.totalPriceAfterDiscount = this.totalPriceBeforeDiscount * (1 - discount / 100);
  }

  onItemSelected(index: number) {
    const selectedItem = this.itemList.find(
      (item: { item_name: any; }) => item.item_name === this.items.at(index).get('item_name')?.value
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
    this.calculateTotalPrice();
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      let data = {};
      if (this.dataToEdit) {
        data = {
          _id:this.dataToEdit._id,
          order_Data: orderData,
          id: this.dataToEdit.id,
          total_Price_BeforeDiscount: this.totalPriceBeforeDiscount,
          total_Price_AfterDiscount: this.totalPriceAfterDiscount,
          created_At: this.dataToEdit.created_At,
          updated_At: new Date()
        }
        console.log("updatedData",data);
        this.modalCtrl.dismiss(data, 'updated_Order');
      }
      else{
        data = {
          order_Data: orderData,
          id: uuidv4(),
          total_Price_BeforeDiscount: this.totalPriceBeforeDiscount,
          total_Price_AfterDiscount: this.totalPriceAfterDiscount,
          created_At: new Date()
        }
        console.log("newOrderData",data);
        this.modalCtrl.dismiss(data, 'new_Order');
      }


    } else {
      console.log('Form is invalid');
    }
  }

}
