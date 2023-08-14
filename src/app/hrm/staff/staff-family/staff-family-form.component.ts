import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseObject } from 'src/app/core/model/response-object';

import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { StaffFamilyService } from './staff-family.service';
import { StaffFamily } from './staff-family.model';
import { HrmCodeService } from '../../hrm-code/hrm-code.service';
import { HrmCode } from '../../hrm-code/hrm-code.model';
import { ResponseList } from 'src/app/core/model/response-list';

@Component({
  selector: 'app-staff-family-form',
  templateUrl: './staff-family-form.component.html',
  styleUrls: ['./staff-family-form.component.css']
})
export class StaffFamilyFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @Input() staff?: {organizationCode: string, staffNo: string, staffName: string};

  /**
   * 가족관계 - HR0008
   */
  familyRelationList: HrmCode[] = [];

  override fg = this.fb.group({
    staffNo             : new FormControl<string | null>(null, { validators: Validators.required }),
    staffName           : new FormControl<string | null>(null, { validators: Validators.required }),
    seq                 : new FormControl<string | null>(null),
    familyName          : new FormControl<string | null>(null, { validators: Validators.required }),
    familyRRN           : new FormControl<string | null>(null, { validators: Validators.required }),
    familyRelation      : new FormControl<string | null>(null, { validators: Validators.required }),
    occupation          : new FormControl<string | null>(null),
    schoolCareerType    : new FormControl<string | null>(null),
    comment             : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: StaffFamilyService,
              private hrmCodeService: HrmCodeService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit() {
    this.getFamilyRelationList();

    if (this.initLoadId) {
      this.get(this.initLoadId.staffId, this.initLoadId.seq);
    } else {
      this.newForm();
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  newForm() {
    this.formType = FormType.NEW;

    this.fg.controls.staffNo.disable();
    this.fg.controls.staffName.disable();

    if (this.staff) {
      this.fg.controls.staffNo.setValue(this.staff?.staffNo);
      this.fg.controls.staffName.setValue(this.staff?.staffName);
    }
  }


  modifyForm(formData: StaffFamily) {
    this.formType = FormType.MODIFY;

    this.fg.controls.staffNo.disable();
    this.fg.controls.staffName.disable();

    if (this.staff) {
      this.fg.controls.staffNo.setValue(this.staff?.staffNo);
      this.fg.controls.staffName.setValue(this.staff?.staffName);
    }

    this.fg.patchValue(formData);
  }


  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(staffId: string, seq: string): void {
    this.service
        .get(staffId, seq)
        .subscribe(
          (model: ResponseObject<StaffFamily>) => {
            if (model.total > 0) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  save() {
    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<StaffFamily>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  remove(staffId: string, seq: string): void {
    this.service
        .delete(staffId, seq)
        .subscribe(
          (model: ResponseObject<StaffFamily>) => {
            this.formDeleted.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  getFamilyRelationList() {
    const params = {
      typeId : 'HR0008'
    };

    this.hrmCodeService
        .getList(params)
        .subscribe(
          (model: ResponseList<HrmCode>) => {
            if ( model.total > 0 ) {
              this.familyRelationList = model.data;
            } else {
              this.familyRelationList = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );
  }

}
