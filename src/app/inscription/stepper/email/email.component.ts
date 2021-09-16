import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounce, debounceTime, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ValidateEmail, ValidateUsername } from '../validators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit, OnDestroy {

  env: any;

  @Input()  stepValid: boolean;
  @Output() stepValidChange = new EventEmitter<boolean>();

  @Input() email: string;
  @Output() emailChange = new EventEmitter<string>();

  subscription: Subscription = new Subscription();

  url$ = new Subject<string>();

  inscriptionForm = new FormGroup({});

  emailExist: boolean = false;

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ){
    this.env = environment;
  }

  getEmail(url: Observable<string>){
    return url
      .pipe<any>(
        switchMap(url => this.getEmailAsObs(url))
      );
  }

  getEmailAsObs(url){
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
      'email',
      new FormControl(
        this.email,
        [
          Validators.required,
          ValidateEmail
        ]
      )
    );

    this.getEmail(this.url$).subscribe(
      res => {
          this.emailExist = res.data;
          this.stepValidChange.emit(this.inscriptionForm.valid && !this.emailExist);
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
        this.email = formData.email;
        if (this.email !== "" && this.email !== undefined){
          this.url$.next(this.env.api_url + "/user/exist/email/" + this.email);
        }
        this.emailChange.emit(this.email);
        
      })
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
