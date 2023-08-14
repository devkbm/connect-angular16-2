import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthorityService } from './authority.service';

export function existingAuthorityValidator(service: AuthorityService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return control.value ? service.getAuthorityDupCheck(control.value)
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
