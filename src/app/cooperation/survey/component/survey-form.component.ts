import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ResponseObject } from '../../../core/model/response-object';
import { FormBase, FormType } from 'src/app/core/form/form-base';
import { SurveyService } from '../service/survey.service';
import { SurveyForm } from '../model/survey-form';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent extends FormBase implements OnInit {
  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  formControlSm = 24;

   ;

  constructor(private fb: FormBuilder,
              private surveyService: SurveyService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      formId    : [ null, [ Validators.required ] ],
      title     : [ null, [ Validators.required ] ],
      comment   : [ null ]
    });
    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg.get('formId')?.enable();

    this.fg.reset();
  }

  public modifyForm(formData: SurveyForm): void {
    this.formType = FormType.MODIFY;

    //this.fg.get('formId').disable();

    this.fg.patchValue(formData);

  }

  public getSurveyForm(id: number): void {
    this.surveyService.getSurveyForm(id)
        .subscribe(
          (model: ResponseObject<SurveyForm>) => {
            if (model.data) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
          }
      );
  }

  public saveSurveyForm(): void {
    this.surveyService
        .saveSurveyForm(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<SurveyForm>) => {
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  public deleteSurveyForm(id: number): void {
    this.surveyService
        .deleteSurveyForm(id)
        .subscribe(
          (model: ResponseObject<SurveyForm>) => {
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
