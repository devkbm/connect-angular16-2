import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from 'src/app/core/service/data.service';
import { ResponseObject } from 'src/app/core/model/response-object';
import { ResponseList } from 'src/app/core/model/response-list';
import { DataDomain } from './data-domain.model';
import { HtmlSelectOption } from 'src/app/shared-component/nz-input-select/html-select-option';

@Injectable({
  providedIn: 'root'
})
export class DataDomainService extends DataService {

  constructor() {
    super('/api/system/datadomin');
  }

  getDatabaseList(): Observable<ResponseList<HtmlSelectOption>> {
    const url = `${this.API_URL}/database`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
   };

    return this.http.get<ResponseList<HtmlSelectOption>>(url, options).pipe(
      catchError(this.handleError<ResponseList<HtmlSelectOption>>('getDatabaseList', undefined))
    );
  }

  getList(): Observable<ResponseList<DataDomain>> {
    const url = `${this.API_URL}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
   };

    return this.http.get<ResponseList<DataDomain>>(url, options).pipe(
      catchError(this.handleError<ResponseList<DataDomain>>('getList', undefined))
    );
  }

  get(id: string): Observable<ResponseObject<DataDomain>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
   };

    return this.http.get<ResponseObject<DataDomain>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<DataDomain>>('get', undefined))
    );
  }

  save(term: DataDomain): Observable<ResponseObject<DataDomain>> {
    const url = `${this.API_URL}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.post<ResponseObject<DataDomain>>(url, term, options).pipe(
      catchError(this.handleError<ResponseObject<DataDomain>>('save', undefined))
    );
  }

  delete(id: string): Observable<ResponseObject<DataDomain>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .delete<ResponseObject<DataDomain>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<DataDomain>>('delete', undefined))
              );
  }

}
