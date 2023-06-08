import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartaoPageRoutingModule } from './cartao-routing.module';

import { CartaoPage } from './cartao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartaoPageRoutingModule
  ],
  declarations: [CartaoPage]
})
export class CartaoPageModule {}
