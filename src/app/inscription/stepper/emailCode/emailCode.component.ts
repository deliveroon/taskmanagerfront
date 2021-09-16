import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ValidateCode } from '../validators';

@Component({
  selector: 'app-emailcode',
  templateUrl: './emailCode.component.html',
  styleUrls: ['./emailCode.component.scss'],
})
export class EmailCodeComponent implements OnInit, OnDestroy {

  env: any;

  @Input()  stepValid: boolean;
  @Output() stepValidChange = new EventEmitter<boolean>();

  @Input() emailCode: string;
  @Output() emailCodeChange = new EventEmitter<string>();

  subscription: Subscription = new Subscription();


  inscriptionForm = new FormGroup({});

  constructor(
    private http: HttpClient
  ){
    this.env = environment;
  }

  ngOnInit() {
    this.subscription = new Subscription();

    this.inscriptionForm.addControl(
      'emailcode',
      new FormControl(
        this.emailCode,
        [
          Validators.required,
          ValidateCode
        ]
      )
    );

    this.subscription.add(
      this.inscriptionForm.valueChanges.subscribe(formData => {
        if (formData.emailCode !== null){ 
          this.emailCode = formData.emailcode.toString();
          this.emailCodeChange.emit(this.emailCode);
        }
        else {
            this.emailCodeChange.emit(null);
        }
        this.stepValidChange.emit(this.inscriptionForm.valid);
          
      })
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
