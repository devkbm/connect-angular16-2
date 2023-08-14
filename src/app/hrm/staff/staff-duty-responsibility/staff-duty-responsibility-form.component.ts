import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { HrmCode } from '../../hrm-code/hrm-code.model';
import { HrmCodeService } from '../../hrm-code/hrm-code.service';
import { StaffDutyResponsibility } from './staff-duty-responsibility.model';
import { StaffDutyResponsibilityService } from './staff-duty-responsibility.service';

@Component({
  selector: 'app-staff-duty-responsibility-form',
  templateUrl: './staff-duty-responsibility-form.component.html',
  styleUrls: ['./staff-duty-responsibility-form.component.css']
})
export class StaffDutyResponsibilityFormComponent extends FormBase implements OnInit, AfterViewInit {

  @Input() staff?: {organizationCode: string, staffNo: string, staffName: string};

  /**
   * 직책코드 - HR0007
   */
  dutyResponsibilityCodeList: HrmCode[] = [];

  override fg = this.fb.group({
      staffNo                 : new FormControl<string | null>(null, { validators: Validators.required }),
      staffName               : new FormControl<string | null>(null),
      seq                     : new FormControl<string | null>({value: null, disabled: true}, { validators: [Validators.required] }),
      dutyResponsibilityCode  : new FormControl<string | null>(null),
      dutyResponsibilityName  : new FormControl<string | null>(null),
      fromDate                : new FormControl<Date | null>(null),
      toDate                  : new FormControl<Date | null>(null),
      isPayApply              : new FormControl<boolean | null>(null)
    });

  constructor(private fb: FormBuilder,
              private service: StaffDutyResponsibilityService,
              private hrmCodeService: HrmCodeService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit(): void {
    this.getHrmTypeDetailCodeList('HR0007', "dutyResponsibilityCodeList");
  }

  ngAfterViewInit(): void {
    if (this.initLoadId && this.initLoadId.staffId && this.initLoadId.seq) {
      this.get(this.initLoadId.staffId, this.initLoadId.seq);
    } else {
      this.newForm();
    }
  }


  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.controls.staffNo.disable();
    this.fg.controls.staffName.disable();

    if (this.staff) {
      this.fg.controls.staffNo.setValue(this.staff?.staffNo);
      this.fg.controls.staffName.setValue(this.staff?.staffName);
    }
  }

  modifyForm(formData: StaffDutyResponsibility): void {
    this.formType = FormType.MODIFY;

    this.fg.controls.staffNo.disable();
    this.fg.controls.staffName.disable();
    this.fg.controls.seq.disable();

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(staffId: string, seq: string): void {
    this.service
        .get(staffId, seq)
        .subscribe(
          (model: ResponseObject<StaffDutyResponsibility>) => {
            if (model.total > 0) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  save(): void {
    if (this.fg.invalid) {
      this.checkForm();
      return;
    }

    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<StaffDutyResponsibility>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        )
  }

  remove(typeCode: string, detailCode: string): void {
    /*
    this.service
        .delete(typeCode, detailCode)
        .subscribe(
          (model: ResponseObject<StaffDutyResponsibility>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
    */
  }


  getHrmTypeDetailCodeList(typeId: string, propertyName: string): void {
    const params = {
      typeId : typeId
    };

    this.hrmCodeService
        .getList(params)
        .subscribe(
          (model: ResponseList<HrmCode>) => {
            if ( model.total > 0 ) {
              this.dutyResponsibilityCodeList = model.data;
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );

  }
}
