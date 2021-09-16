import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./auth-guard.service";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    outlet: 'primary'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    outlet: 'primary'
  },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule),
    outlet: 'primary'
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule),
    outlet: 'primary'
  },
  {
    path: 'espace-membre',
    loadChildren: () => import('./espace-membre/espace-membre.module').then( m => m.EspaceMembrePageModule),
    outlet: 'primary',
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
