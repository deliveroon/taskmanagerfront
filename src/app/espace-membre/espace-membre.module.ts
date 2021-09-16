import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EspaceMembrePageRoutingModule } from './espace-membre-routing.module';

import { EspaceMembrePage } from './espace-membre.page';
import { UsersPage } from './users/users.page';
import { TasksPage } from './tasks/tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EspaceMembrePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    EspaceMembrePage,
    TasksPage,
    UsersPage,
  ]
})
export class EspaceMembrePageModule {}
