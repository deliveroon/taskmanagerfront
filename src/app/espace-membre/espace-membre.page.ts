/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable curly */
/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable @angular-eslint/component-class-suffix */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-espace-membre',
  templateUrl: './espace-membre.page.html',
  styleUrls: ['./espace-membre.page.scss'],
})
export class EspaceMembrePage implements OnInit {

  env: any;
  token: string;

  users: Array<any> = new Array();
  tasks: Array<any> = new Array();

  constructor(
    private auth: AuthGuardService,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.env = environment;
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
    this.refreshUsers();
    this.refreshTasks();
  }

  refreshUsers(){
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', 'bearer ' + this.token);

    this.http.get<Array<any>>(this.env.api_url + "/user/all", {headers: headers}).subscribe(
      res => {
        this.users = res;
      },
      async (err) => {
        const toast = await this.toastController.create({
          message: 'Vérifier votre connexion',
          duration: 2000
        });
        toast.present();
      }
    );
  }

  refreshTasks(){
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', 'bearer ' + this.token);

    this.http.get<Array<any>>(this.env.api_url + "/task/getall", {headers: headers}).subscribe(
      res => {
        this.tasks = res;
      },
      async (err) => {
        const toast = await this.toastController.create({
          message: 'Vérifier votre connexion',
          duration: 2000
        });
        toast.present();
      }
    );
  }

  refreshData(e){
    this.refreshUsers();
    this.refreshTasks();
  }

  logout(){
    this.auth.logout();
  }

}
