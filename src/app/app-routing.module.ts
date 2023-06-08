import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./start/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then(m => m.StartPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./start/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./home/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./home/menu/menu.module').then( m => m.MenuPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
