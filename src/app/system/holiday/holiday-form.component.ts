import { CommonModule, formatDate } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzInputDateComponent } from 'src/app/shared/nz-input-date/nz-input-date.component';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';

import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { HolidayService } from './holiday.service';
import { ResponseObject } from 'src/app/core/model/response-object';
import { Holiday } from './holiday.model';

@Component({
  standalone: true,
  selector: 'app-holiday-form',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NzFormModule,
    NzCrudButtonGroupComponent, NzInputTextComponent, NzInputTextareaComponent, NzInputDateComponent
  ],
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.css']
})
export class HolidayFormComponent extends FormBase implements OnInit, AfterViewInit {

  override fg = this.fb.group({
    date          : new FormControl<Date | null>(null, { validators: Validators.required }),
    holidayName   : new FormControl<string | null>(null, { validators: Validators.required }),
    comment       : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: HolidayService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit(): void {
    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm(new Date());
    }
  }

  ngAfterViewInit(): void {
  }

  newForm(date: Date): void {
    this.formType = FormType.NEW;
    this.fg.reset();

    this.fg.controls.date.setValue(date);
  }

  modifyForm(formData: Holiday): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(date: Date): void {
    const id = formatDate(date,'YYYYMMdd','ko-kr');

    this.service
        .getHoliday(id)
        .subscribe(
            (model: ResponseObject<Holiday>) => {
              if ( model.total > 0 ) {
                this.modifyForm(model.data);
              } else {
                this.newForm(date);
              }
              this.appAlarmService.changeMessage(model.message);
            }
        );
  }

  save(): void {
    if (this.fg.invalid) {
      this.checkForm()
      return;
    }

    this.service
        .saveHoliday(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Holiday>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(): void {
    this.service
        .deleteHoliday(formatDate(this.fg.controls.date.value!,'YYYYMMdd','ko-kr'))
        .subscribe(
          (model: ResponseObject<Holiday>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

}
