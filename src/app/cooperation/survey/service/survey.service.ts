import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../core/service/data.service';
import { ResponseObject } from '../../../core/model/response-object';
import { ResponseList } from '../../../core/model/response-list';
import { SurveyForm } from '../model/survey-form';
import { SurveyItem } from '../model/survey-item';

@Injectable({
  providedIn: 'root'
})
export class SurveyService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
      super('/survey', http, tokenExtractor);
  }

  /**
   * @description 팀명단을 조회한다.
   * @param id 팀 id
   */
  public getSurveyForm(id: number): Observable<ResponseObject<SurveyForm>> {
    const url = `${this.API_URL}/form/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<SurveyForm>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<SurveyForm>>('getSurveyForm', undefined))
      );
  }

  /**
   * @description 팀을 저장한다.
   * @param team team 객체
   */
  public saveSurveyForm(surveyForm: SurveyForm): Observable<ResponseObject<SurveyForm>> {
    const url = `${this.API_URL}/form`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
    .post<ResponseObject<SurveyForm>>(url, surveyForm, options)
    .pipe(
      catchError(this.handleError<ResponseObject<SurveyForm>>('saveSurveyForm', undefined))
    );

  }

  public deleteSurveyForm(id: number): Observable<ResponseObject<SurveyForm>> {
    const url = `${this.API_URL}/form/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<SurveyForm>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<SurveyForm>>('deleteSurveyForm', undefined))
      );
  }

  public getSurveyItem(formId: number, itemId: number): Observable<ResponseObject<SurveyItem>> {
    const url = `${this.API_URL}/form/${formId}/item/${itemId}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<SurveyItem>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<SurveyItem>>('getSurveyItem', undefined))
      );
  }

  public saveSurveyItem(surveyItem: SurveyItem): Observable<ResponseObject<SurveyItem>> {
    const url = `${this.API_URL}/form/item`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
    .post<ResponseObject<SurveyItem>>(url, surveyItem, options)
    .pipe(
      catchError(this.handleError<ResponseObject<SurveyItem>>('saveSurveyItem', undefined))
    );
  }

  public deleteSurveyItem(formId: number, itemId: number): Observable<ResponseObject<SurveyItem>> {
    const url = `${this.API_URL}/form/${formId}/item/${itemId}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<SurveyItem>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<SurveyItem>>('deleteSurveyItem', undefined))
      );
  }

}
