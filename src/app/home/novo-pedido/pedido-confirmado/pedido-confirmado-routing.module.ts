import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoConfirmadoPage } from './pedido-confirmado.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoConfirmadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoConfirmadoPageRoutingModule {}
