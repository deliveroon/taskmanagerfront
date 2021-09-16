import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidatePassword } from '../validators';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit, OnDestroy {

  @Input()  stepValid: boolean;
  @Output() stepValidChange = new EventEmitter<boolean>();

  @Input() password: string;
  @Output() passwordChange = new EventEmitter<string>();

  subscription: Subscription = new Subscription();

  inscriptionForm = new FormGroup({});

  Classes = {
    required: 'red',
    length: 'red',
    special: 'red',
    upper: 'red',
    lower: 'red',
    digit: 'red'
  }

  constructor(
  ){}

  ngOnInit() {
    this.inscriptionForm.addControl(
      'password',
      new FormControl(
        this.password,
        [
          Validators.required,
          ValidatePassword
        ]
      )
    );

    this.subscription.add(
      this.inscriptionForm.valueChanges.subscribe(formData => {
        this.password = formData.password;
        this.passwordChange.emit(this.password);
        this.stepValidChange.emit(this.inscriptionForm.valid);
      })
    );

    this.passwordRefresh();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  passwordRefresh(){
    this.Classes.required = this.inscriptionForm.hasError('required', 'password') ? 'red' : 'green';
    this.Classes.length = this.inscriptionForm.hasError('passwordLength', 'password') ? 'red' : 'green';
    this.Classes.special = this.inscriptionForm.hasError('passwordSpecial', 'password') ? 'red' : 'green';
    this.Classes.upper = this.inscriptionForm.hasError('passwordUpper', 'password') ? 'red' : 'green';
    this.Classes.lower = this.inscriptionForm.hasError('passwordLower', 'password') ? 'red' : 'green';
    this.Classes.digit = this.inscriptionForm.hasError('passwordDigit', 'password') ? 'red' : 'green';
  }

}
