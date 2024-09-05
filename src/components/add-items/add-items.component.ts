import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss'],
})
export class AddItemsComponent implements OnInit {
  itemsForm!: FormGroup;
  user: any;


  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {


  }

  async ngOnInit() {
    this.itemsForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
    this.user = await this.authService.user;
    console.log(this.user);
    if (this.user) {
    }
  }

  get items(): FormArray {
    return this.itemsForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      item_name: ['', Validators.required],
      item_price: [0, [Validators.required, Validators.min(1)]],
      item_section: ['', Validators.required]
    });
  }
  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }



  async submitForm() {
    if (this.itemsForm.invalid) {
      await this.showAlert('Error', 'Please fill out all required fields correctly.');
      return;
    }
    console.log(this.itemsForm.value.items)
    const response = await this.user.functions.addItemsData(this.itemsForm.value.items);


    if (response.success) {
      await this.showAlert('Success', 'Items added successfully.');
      this.modalCtrl.dismiss(response, 'confirm');
      this.itemsForm.reset();
      this.items.clear();
      this.addItem(); // Add one empty form after clearing
    } else {
      await this.showAlert('Error', response.error);
    }

  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
