import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidator, AsyncValidatorFn } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user.model';
import { ResponseObject } from 'src/app/core/model/response-object';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

export function existingUserValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    // console.log(control.root);
    // console.log(control.parent.get('name').value);
    return control.value ? userService
              .checkUser(control.value)
              .pipe(
                map( responseObj => {
                  if ( responseObj.data == false ) {
                    return {exists: responseObj.message};
                  } else {
                    return null;
                  }
                } )
              ) : new Observable<null>();
  };
}

@Directive({
  selector: '[validUserDuplication]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: UserDuplicationValidatorDirective, multi: true }
  ]
})
export class UserDuplicationValidatorDirective implements AsyncValidator {

  constructor(private userService: UserService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    /*return this.userService
              .checkUser(control.value)
              .pipe(
                map( users => {
                return users.data ? {'exists': users.message} : null;
                } )
              );*/
    return existingUserValidator(this.userService)(control);

  }
}
