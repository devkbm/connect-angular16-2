import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidator, AsyncValidatorFn } from '@angular/forms';
import { DeptService } from './dept.service';


import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

export function existingDeptValidator(deptService: DeptService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return control.value ? deptService
              .getValidateDeptDup(control.value)
              .pipe(
                map( responseObj => {
                  if ( responseObj.data == true ) {
                    return {exists: responseObj.message};
                  } else {
                    return null;
                  }
                } )
              ) : new Observable<null>();
  };
}


@Directive({
  selector: '[appDeptDuplicationValidator]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: DeptDuplicationValidatorDirective, multi: true }
  ]
})
export class DeptDuplicationValidatorDirective implements AsyncValidator {

  constructor(private deptService: DeptService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    /*return this.userService
              .checkUser(control.value)
              .pipe(
                map( users => {
                return users.data ? {'exists': users.message} : null;
                } )
              );*/
    return existingDeptValidator(this.deptService)(control);

  }
}
