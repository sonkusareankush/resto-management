import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { AddItemsComponent } from 'src/components/add-items/add-items.component';
import { ManageItemsComponent } from 'src/components/manage-items/manage-items.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Tab2Page,AddItemsComponent,ManageItemsComponent]
})
export class Tab2PageModule {}
