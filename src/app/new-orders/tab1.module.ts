import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { OrderFormComponent } from 'src/components/order-form/order-form.component';
import { OrderDetailsCardComponent } from 'src/components/order-details-card/order-details-card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Tab1Page,OrderFormComponent,OrderDetailsCardComponent]
})
export class Tab1PageModule {}
