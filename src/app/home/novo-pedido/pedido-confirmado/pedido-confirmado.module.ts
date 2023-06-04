import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoConfirmadoPageRoutingModule } from './pedido-confirmado-routing.module';

import { PedidoConfirmadoPage } from './pedido-confirmado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoConfirmadoPageRoutingModule
  ],
  declarations: [PedidoConfirmadoPage]
})
export class PedidoConfirmadoPageModule {}
