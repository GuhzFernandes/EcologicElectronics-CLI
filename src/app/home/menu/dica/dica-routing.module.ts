import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DicaPage } from './dica.page';

const routes: Routes = [
  {
    path: '',
    component: DicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DicaPageRoutingModule {}
