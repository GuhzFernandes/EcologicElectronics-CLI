import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DadosColetaPage } from './dados-coleta.page';

const routes: Routes = [
  {
    path: '',
    component: DadosColetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DadosColetaPageRoutingModule {}
