import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscriptionPageRoutingModule } from './inscription-routing.module';


import { InscriptionPage } from './inscription.page';
import { StepperComponent } from './stepper/stepper.component';
import { BirthComponent } from './stepper/birthDate/birthdate.component';
import { PasswordComponent } from './stepper/password/password.component';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { UsernameComponent } from './stepper/username/username.component';
import { EmailCodeComponent } from './stepper/emailCode/emailCode.component';
import { EmailComponent } from './stepper/email/email.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscriptionPageRoutingModule,
    ReactiveFormsModule,
    IonIntlTelInputModule,

  ],
  declarations: [
    InscriptionPage,
    StepperComponent,
    BirthComponent,
    EmailComponent,
    PasswordComponent,
    UsernameComponent,
    EmailCodeComponent
  ]
})
export class InscriptionPageModule {}
