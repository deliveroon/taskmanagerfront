import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConnexionPage } from '../connexion/connexion.page';
import { InscriptionPage } from '../inscription/inscription.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public modalController: ModalController
  ){}

  async openInscription() {
    const modal = await this.modalController.create({
      component: InscriptionPage,
    });
    return await modal.present();
  }

  async openConnexion() {
    const modal = await this.modalController.create({
      component: ConnexionPage
    });
    return await modal.present();
  }

}
