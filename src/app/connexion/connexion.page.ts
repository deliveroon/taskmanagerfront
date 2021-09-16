/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  connexionError = false;
  username = '';
  password = '';

  connexionForm = new FormGroup({
    username: new FormControl(
      this.username,
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ),
    password: new FormControl(
      this.password,
      [
        Validators.required,
        Validators.minLength(8),
      ]
    ),
  });

  constructor(
    public modalController: ModalController,
    private auth: AuthGuardService
  ){}

  ngOnInit() {
    this.subscription.add(
      this.connexionForm.valueChanges.subscribe(formData => {
        this.username = formData.username;
        this.password = formData.password;
      })
    );
  }

  dismiss() {
    this.modalController.dismiss({
      // eslint-disable-next-line quote-props
      'dismissed': true
    });
  }

  connect(){
    this.auth.authentication(this.username, this.password);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
