import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StripePageRoutingModule } from './stripe-routing.module';

import { StripePage } from './stripe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StripePageRoutingModule,
  ],
  declarations: [StripePage],
})
export class StripePageModule {}
