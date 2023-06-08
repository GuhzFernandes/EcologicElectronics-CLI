import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DicaPageRoutingModule } from './dica-routing.module';

import { DicaPage } from './dica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DicaPageRoutingModule
  ],
  declarations: [DicaPage]
})
export class DicaPageModule {}
