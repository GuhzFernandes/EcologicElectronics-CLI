import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoPedidoPage } from './novo-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: NovoPedidoPage
  },
  {
    path: 'dados-coleta',
    loadChildren: () => import('../novo-pedido/dados-coleta/dados-coleta.module').then( m => m.DadosColetaPageModule)
  },
  {
    path: 'dados-coleta',
    loadChildren: () => import('./dados-coleta/dados-coleta.module').then( m => m.DadosColetaPageModule)
  },
  {
    path: 'pedido-confirmado',
    loadChildren: () => import('./pedido-confirmado/pedido-confirmado.module').then( m => m.PedidoConfirmadoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoPedidoPageRoutingModule {}
