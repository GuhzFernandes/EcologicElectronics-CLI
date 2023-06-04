import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {path:'menu',
      loadChildren:()=> import('./menu/menu.module').then(m => m.MenuPageModule)},
      {path:'perfil',
      loadChildren:()=> import('./perfil/perfil.module').then(m => m.PerfilPageModule)},

    ]
  },  {
    path: 'historico',
    loadChildren: () => import('./historico/historico.module').then( m => m.HistoricoPageModule)
  },
  {
    path: 'novo-pedido',
    loadChildren: () => import('./novo-pedido/novo-pedido.module').then( m => m.NovoPedidoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
