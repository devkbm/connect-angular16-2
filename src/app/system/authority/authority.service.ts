import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from 'src/app/core/service/data.service';

import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';

import { GlobalProperty } from 'src/app/core/global-property';
import { Authority } from './authority.model';

@Injectable()
export class AuthorityService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/system/authority', http, tokenExtractor);
  }

  getAuthorityList(params?: any): Observable<ResponseList<Authority>> {
    const url = `${this.API_URL}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http
      .get<ResponseList<Authority>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseList<Authority>>('getAuthorityList', undefined))
      );
  }

  getAuthority(id: string): Observable<ResponseObject<Authority>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<Authority>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<Authority>>('getAuthority', undefined))
      );
  }

  getAuthorityDupCheck(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URL}/${id}/check`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<boolean>>(url, options)
      .pipe(
        //catchError(this.handleError<ResponseObject<boolean>>('getAuthorityDupCheck', undefined))
      );
  }

  registerAuthority(authority: Authority): Observable<ResponseObject<Authority>> {
    const url = `${this.API_URL}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .post<ResponseObject<Authority>>(url, authority, options)
      .pipe(
        catchError(this.handleError<ResponseObject<Authority>>('registerAuthority', undefined))
      );
  }

  deleteAuthority(id: string): Observable<ResponseObject<Authority>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<Authority>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<Authority>>('deleteAuthority', undefined))
      );
  }

}
