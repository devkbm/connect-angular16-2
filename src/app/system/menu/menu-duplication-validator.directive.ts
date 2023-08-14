import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidator, AsyncValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { MenuService } from './menu.service';

export function existingMenuValidator(menuService: MenuService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return control.value ?
              menuService.getValidDupMenu(control.value)
                          .pipe(
                            map( responseObj => {
                              if ( responseObj.data === false ) {
                                return {exists: responseObj.message};
                              } else {
                                return null;
                              }
                            } )
                          ) : new Observable<null>();
  };
}
