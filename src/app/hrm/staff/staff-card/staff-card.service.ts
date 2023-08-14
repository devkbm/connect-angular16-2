import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from 'src/app/core/service/data.service';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { StaffCardModel } from './staff-card.model';

@Injectable({
  providedIn: 'root'
})
export class StaffCardService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/hrm/staff-card', http, tokenExtractor);
  }

  getList(): Observable<ResponseList<StaffCardModel>> {
    const url = `${this.API_URL}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseList<StaffCardModel>>(url, options).pipe(
      catchError(this.handleError<ResponseList<StaffCardModel>>('getList', undefined))
    );
  }

}
