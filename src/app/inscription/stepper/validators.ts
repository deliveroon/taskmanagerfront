import { AbstractControl } from '@angular/forms';

export function ValidatePassword(control: AbstractControl) {
  var errorObject = {};
  if (! control.value.toString().match(/(?=.*[a-z])/g)) {
    errorObject['passwordLower'] = true;
  }
  if (! control.value.toString().match(/(?=.*[A-Z])/g)) {
    errorObject['passwordUpper'] = true;
  }
  if (! control.value.toString().match(/(?=.*[0-9])/g)) {
    errorObject['passwordDigit'] = true;
  }
  if (! control.value.toString().match(/(?=.*[!@#\$%\^&\*])/g)) {
    errorObject['passwordSpecial'] = true;
  }
  if ( control.value.toString().length < 8) {
    errorObject['passwordLength'] = true;
  }
  if (errorObject === {}){
      return null;
  }
  else {
      return errorObject;
  }
}

export function ValidateUsername(control: AbstractControl) {
  var errorObject = {};
  if (!control.value.toString().match(/^[A-Za-z0-9]+$/g)) {
    errorObject['usernameSpecial'] = true;
  }
  if ( control.value.toString().length < 8 || control.value.toString().length > 20) {
    errorObject['usernameLength'] = true;
  }
  if (errorObject === {}){
      return null;
  }
  else {
      return errorObject;
  }
}

export function ValidateCode(control: AbstractControl) {
  var errorObject = {};
  if ( control.value !== null) {
    if ( control.value.toString().length !== 6) {
      errorObject['codeLength'] = true;
    }
  }
  else {
    errorObject['codeNull'] = true;
  }
  
  if (errorObject === {}){
      return null;
  }
  else {
      return errorObject;
  }
}

export function ValidateEmail(control: AbstractControl) {
  var errorObject = {};
  if ( control.value !== null) {
    if (!control.value.toString().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g)) {
      errorObject['emailFormat'] = true;
    }
  }
  if (errorObject === {}){
      return null;
  }
  else {
      return errorObject;
  }
}