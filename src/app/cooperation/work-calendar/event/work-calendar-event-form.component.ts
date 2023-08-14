import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { ResponseList } from 'src/app/core/model/response-list';

import { WorkCalendarEvent } from './work-calendar-event.model';
import { WorkCalendarEventService } from './work-calendar-event.service';

import { WorkCalendarService } from '../calendar/work-calendar.service';
import { WorkCalendar } from '../calendar/work-calendar.model';

import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzInputDateTimeComponent, TimeFormat } from 'src/app/shared/nz-input-datetime/nz-input-datetime.component';

import * as dateFns from "date-fns";
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzInputSimpleColorPickerComponent } from 'src/app/shared/nz-input-color-picker/nz-input-simple-color-picker.component';
import { NzInputSelectComponent } from 'src/app/shared/nz-input-select/nz-input-select.component';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputCheckboxComponent } from 'src/app/shared/nz-input-checkbox/nz-input-checkbox.component';

export interface NewFormValue {
  workCalendarId: number;
  start: Date;
  end: Date;
}

@Component({
  standalone: true,
  selector: 'app-work-calendar-event-form',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NzFormModule,
    NzInputTextComponent, NzCrudButtonGroupComponent, NzInputSimpleColorPickerComponent,
    NzInputSelectComponent, NzInputTextareaComponent, NzInputDateTimeComponent, NzInputCheckboxComponent
  ],
  templateUrl: './work-calendar-event-form.component.html',
  styleUrls: ['./work-calendar-event-form.component.css']
})
export class WorkCalendarEventFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('text', {static: true}) text!: NzInputTextareaComponent;
  @Input() override initLoadId: number = -1;
  @Input() newFormValue?: NewFormValue;

  timeFormat: TimeFormat = TimeFormat.HourMinute;

  workGroupList: WorkCalendar[] = [];

  constructor(private fb: FormBuilder,
              private service: WorkCalendarEventService,
              private workGroupService: WorkCalendarService) {
    super();

    this.fg = this.fb.group({
      id              : new FormControl<string | null>({value: null, disabled: true}, { validators: [Validators.required] }),
      text            : new FormControl<string | null>(null, { validators: [Validators.required] }),
      start           : new FormControl<string | null>(null),
      end             : new FormControl<string | null>(null),
      allDay          : new FormControl<boolean | null>(null),
      workCalendarId  : new FormControl<string | null>(null, { validators: [Validators.required] })
    });
  }

  ngOnInit(): void {
    this.getMyWorkGroupList();

    if (this.initLoadId > 0) {
      this.get(this.initLoadId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.newFormValue) {
      this.newForm(this.newFormValue);
    }
  }

  ngAfterViewInit(): void {
    this.text?.focus();
  }

  newForm(params: NewFormValue): void {
    this.formType = FormType.NEW;

    // 30분 단위로 입력받기 위해 초,밀리초 초기화
    params.start.setSeconds(0);
    params.start.setMilliseconds(0);
    params.end.setSeconds(0);
    params.end.setMilliseconds(0);

    this.fg.get('workCalendarId')?.setValue(Number.parseInt(params.workCalendarId.toString(),10));
    this.fg.get('start')?.setValue(dateFns.format(params.start, "yyyy-MM-dd HH:mm:ss"));
    this.fg.get('end')?.setValue(dateFns.format(params.end, "yyyy-MM-dd HH:mm:ss"));
  }

  modifyForm(formData: WorkCalendarEvent): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: number): void {
    this.service.getWorkGroupSchedule(id)
        .subscribe(
            (model: ResponseObject<WorkCalendarEvent>) => {
              if (model.data) {
                console.log(model.data);
                this.modifyForm(model.data);
              }
            }
        );
  }

  save(): void {
    if (this.fg.invalid) {
      this.checkForm();
      return;
    }

    this.service
        .saveWorkGroupSchedule(this.fg.getRawValue())
        .subscribe(
            (model: ResponseObject<WorkCalendarEvent>) => {
              this.formSaved.emit(this.fg.getRawValue());
            }
        );
  }

  remove(id: number): void {
    this.service.deleteWorkGroupSchedule(id)
        .subscribe(
            (model: ResponseObject<WorkCalendarEvent>) => {
              this.formDeleted.emit(this.fg.getRawValue());
            }
        );
  }

  getMyWorkGroupList(): void {
    this.workGroupService
        .getMyWorkGroupList()
        .subscribe(
          (model: ResponseList<WorkCalendar>) => {
            if (model.total > 0) {
                this.workGroupList = model.data;
            } else {
                this.workGroupList = [];
            }
            //this.appAlarmService.changeMessage(model.message);
          }
        );
  }
}
