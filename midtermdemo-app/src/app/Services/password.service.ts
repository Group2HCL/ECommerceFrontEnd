import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordServiceService {

  constructor() { }

  //[Form] Controls--> store user input w/ ability to validate 
  mustMatch (firstControl: AbstractControl): ValidatorFn {
    return (secondControl: AbstractControl
      ): { [key: string]: boolean } | null => {
          // return null if no user input
          if (!firstControl && !secondControl) {
              return null;
          }

          // return if the password confirmation has an error
          if (secondControl.hasError && !firstControl.hasError) {
              return null;
          }
          // set error on matchingControl if validation fails
          if (firstControl.value !== secondControl.value) {
              return { mustMatch: true };
          } else {
              return null;
          }
      };
  }
}