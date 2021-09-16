import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounce, debounceTime, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ValidateUsername } from '../validators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss'],
})
export class UsernameComponent implements OnInit, OnDestroy {

  env: any;

  @Input()  stepValid: boolean;
  @Output() stepValidChange = new EventEmitter<boolean>();

  @Input() username: string;
  @Output() usernameChange = new EventEmitter<string>();

  subscription: Subscription = new Subscription();

  url$ = new Subject<string>();

  inscriptionForm = new FormGroup({});

  userExist: boolean = false;

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ){
    this.env = environment;
  }

  getUsername(url: Observable<string>){
    return url
      .pipe<any>(
        switchMap(url => this.getUsernameAsObs(url))
      );
  }

  getUsernameAsObs(url){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get<any>(url, requestOptions);
  }

  ngOnInit() {
    this.inscriptionForm.addControl(
      'username',
      new FormControl(
        this.username,
        [
          Validators.required,
          ValidateUsername
        ]
      )
    );

    this.getUsername(this.url$).subscribe(
      res => {
          this.userExist = res.data;
          this.stepValidChange.emit(this.inscriptionForm.valid && !this.userExist);
      },
      async (err) => {
        const toast = await this.toastController.create({
          message: 'Vérifier votre connexion',
          duration: 2000
        });
        toast.present();
      }
    );

    this.subscription.add(
      this.inscriptionForm.valueChanges.pipe(debounceTime(400)).subscribe(formData => { 
        this.username = formData.username;
        if (this.username !== "" && this.username !== undefined){
          this.url$.next(this.env.api_url + "/user/exist/username/" + this.username);
        }
        this.usernameChange.emit(this.username);
        
      })
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
