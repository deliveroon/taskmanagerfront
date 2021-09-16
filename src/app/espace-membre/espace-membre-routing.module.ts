import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspaceMembrePage } from './espace-membre.page';

const routes: Routes = [
  {
    path: '',
    component: EspaceMembrePage
  },
  {
    path: '',
    redirectTo: 'spinner',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspaceMembrePageRoutingModule {}
