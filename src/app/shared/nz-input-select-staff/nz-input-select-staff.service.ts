import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from 'src/app/core/service/data.service';
import { ResponseList } from 'src/app/core/model/response-list';

export interface Staff {
  staffId: string;
  organizationCode: string;
  staffNo: string;
  name: string;
  nameEng: string;
  nameChi: string;
  residentRegistrationNumber: string;
  gender: string;
  birthday: Date;
  imagePath: string;

  [key:string]:any;
}

@Injectable({
  providedIn: 'root'
})
export class NzInputSelectStaffService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/hrm/staff', http, tokenExtractor);
  }

  getList(params?: any): Observable<ResponseList<Staff>> {
    const url = `${this.API_URL}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<Staff>>(url, options).pipe(
      catchError(this.handleError<ResponseList<Staff>>('getList', undefined))
    );
  }

}
