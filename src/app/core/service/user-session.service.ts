import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DataService } from './data.service';
import { ResponseObject } from '../model/response-object';
import { User } from '../../system/user/user.model';
import { GlobalProperty } from 'src/app/core/global-property';


@Injectable()
export class UserSessionService extends DataService {
  private STATIC_URI = '/static/';

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/system/user', http, tokenExtractor);
    this.STATIC_URI = GlobalProperty.serverUrl + '/static/';
  }

  getAvartarImageString(): string | null {
    const imageUrl = sessionStorage.getItem('imageUrl');
    if (imageUrl === 'null') return null;

    return this.STATIC_URI + sessionStorage.getItem('imageUrl');
  }

  getMyProfile(): Observable<ResponseObject<User>> {
    const url = `${this.API_URL}/my-profile`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<User>>(url, options).pipe(
        //catchError((err) => Observable.throw(err))
      );
  }
}
