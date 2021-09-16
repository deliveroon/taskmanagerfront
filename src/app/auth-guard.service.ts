/* eslint-disable object-shorthand */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ModalController, ToastController } from '@ionic/angular';
import { Token } from './token';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  env: any;
  private authInfo: any = {
    authenticated: false
  };

  constructor(
    private toastController: ToastController,
    private http: HttpClient,
    private router: Router,
    private modalController: ModalController
  ) {
    this.env = environment;
  }

  setToken(username, password)  {
    this.http.post<Token>(this.env.api_url+'/auth/login', {
      username: username,
      password: password
    }).subscribe((res)=>{
      sessionStorage.setItem('name', username);
      sessionStorage.setItem('token', res.access_token);
      this.authInfo.authenticated = true;
      this.router.navigate(['espace-membre']);
      this.modalController.dismiss({
        // eslint-disable-next-line quote-props
        'dismissed': true
      });
    },
    async (err)=>{
      const toast = await this.toastController.create({
        message: 'Nom d\'utilisateur ou mot de passe incorrect',
        duration: 2000
      });
      toast.present();
    });

  }

  authentication(username, password){
    const hash = CryptoJS.SHA512(password).toString();
    this.setToken(username, hash);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (! this.authInfo.authenticated) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }
  logout(){
    window.location.reload();
  }
}
