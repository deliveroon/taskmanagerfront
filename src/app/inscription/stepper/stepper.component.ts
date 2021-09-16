import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import CryptoJS from 'crypto-js';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, OnDestroy {

  env: any;

  @Input()  stepNumber: number;
  @Output() stepNumberChange = new EventEmitter<number>();

  inscriptionForm = {
    birthDate: null,
    username: '',
    password: '',
    email: '',
    emailCode: ''
  }
  stepsValid: boolean[] = [
    false,
    false,
    false,
    false,
    false,
  ];

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ){
    this.env = environment;
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
  }

  next(){

    if(this.stepNumber === 4){
      this.inscriptionForm.password = CryptoJS.SHA512(this.inscriptionForm.password).toString();
      this.http.post<any>(this.env.api_url + "/user/sendemail", this.inscriptionForm).subscribe(
        res => {
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
    if(this.stepNumber === 5){
      this.http.put<any>(this.env.api_url + "/user/confirm", this.inscriptionForm).subscribe(
        async (res) => {
            const toast = await this.toastController.create({
              message: res.message,
              duration: 2000
            });
            toast.present();
            if (res.data === 1){
              window.location.href = "/";
            }
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
    // Incrementation step si ce n'est pas la derniere
    if(this.stepNumber < 5){
      this.stepNumber++;
      this.stepNumberChange.emit(this.stepNumber);
    }
  }
}
