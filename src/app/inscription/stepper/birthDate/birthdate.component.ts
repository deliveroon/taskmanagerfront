import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-birthdate',
  templateUrl: './birthdate.component.html',
  styleUrls: ['./birthdate.component.scss'],
})
export class BirthComponent implements OnInit, OnDestroy {

  @Input()  stepValid: boolean;
  @Output() stepValidChange = new EventEmitter<boolean>();

  @Input() birthDate: any;
  @Output() birthDateChange = new EventEmitter<any>();

  subscription: Subscription = new Subscription();

  inscriptionForm = new FormGroup({});

  dateMax= "";


  constructor(
  ){}

  ngOnInit() {
    this.dateMax = (+(new Date().toISOString().substr(0,4)) -18) + new Date().toISOString().substr(4,6);
    this.inscriptionForm.addControl(
      'birthDate',
      new FormControl(
        this.birthDate,
        [
          Validators.required,
        ]
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setDate(e){
    this.birthDate = e.target.value;
    this.birthDateChange.emit(this.birthDate);
    this.stepValidChange.emit(true);
  }
}
