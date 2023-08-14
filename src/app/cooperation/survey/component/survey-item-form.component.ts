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
import { SurveyItem } from '../model/survey-item';

@Component({
  selector: 'app-survey-item-form',
  templateUrl: './survey-item-form.component.html',
  styleUrls: ['./survey-item-form.component.css']
})
export class SurveyItemFormComponent extends FormBase implements OnInit {
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
      itemId    : [ null, [ Validators.required ] ],
      formId    : [ null, [ Validators.required ] ],
      itemType  : [ null, [ Validators.required ] ],
      label     : [ null ],
      value     : [ null ],
      required  : [ null ],
      comment   : [ null ]
    });

    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg.get('formId')?.enable();

    this.fg.reset();
  }

  public modifyForm(formData: SurveyItem): void {
    this.formType = FormType.MODIFY;

    //this.fg.get('formId').disable();

    this.fg.patchValue(formData);

  }

  public getSurveyItem(formId: number, itemId: number): void {
    this.surveyService
        .getSurveyItem(formId, itemId)
        .subscribe(
          (model: ResponseObject<SurveyItem>) => {
            if (model.data) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
          },
          (err) => {},
          () => {}
      );
  }

  public saveSurveyItem(): void {
    this.surveyService
        .saveSurveyItem(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<SurveyItem>) => {
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {
            console.log('완료');
          }
        );
  }

  public deleteSurveyItem(formId: number, itemId: number): void {
    this.surveyService
        .deleteSurveyItem(formId, itemId)
        .subscribe(
          (model: ResponseObject<SurveyItem>) => {
            this.formDeleted.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {
            console.log('완료');
          }
        );
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
