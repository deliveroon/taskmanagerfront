import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  stepNumber = 1;

  constructor(
    public modalController: ModalController
  ){}

  ngOnInit() {
  }

  dismiss() {
    if(this.stepNumber > 1){
      this.stepNumber--;
    }
    else{
      this.modalController.dismiss({
        // eslint-disable-next-line quote-props
        'dismissed': true
      });
    }
  }

}
