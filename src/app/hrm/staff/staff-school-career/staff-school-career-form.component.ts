import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseObject } from 'src/app/core/model/response-object';
import { StaffSchoolCareer } from './staff-school-career.model';
import { ResponseList } from 'src/app/core/model/response-list';
import { HrmCode } from '../../hrm-code/hrm-code.model';
import { HrmCodeService } from '../../hrm-code/hrm-code.service';
import { StaffSchoolCareerService } from './staff-school-career.service';

@Component({
  selector: 'app-staff-school-career-form',
  templateUrl: './staff-school-career-form.component.html',
  styleUrls: ['./staff-school-career-form.component.css']
})
export class StaffSchoolCareerFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @Input() staff?: {organizationCode: string, staffNo: string, staffName: string};

  /**
   * 학력 - HR0009
   */
  schoolCareerTypeList: HrmCode[] = [];
  /**
   * 학교 - HR0010
   */
  schoolCodeList: HrmCode[] = [];

  override fg = this.fb.group({
    staffNo             : new FormControl<string | null>(null, { validators: Validators.required }),
    staffName           : new FormControl<string | null>(null, { validators: Validators.required }),
    seq                 : new FormControl<string | null>(null),
    schoolCareerType    : new FormControl<string | null>(null, { validators: Validators.required }),
    schoolCode          : new FormControl<string | null>(null, { validators: Validators.required }),
    fromDate            : new FormControl<Date | null>(null, { validators: Validators.required }),
    toDate              : new FormControl<Date | null>(null),
    majorName           : new FormControl<string | null>(null),
    pluralMajorName     : new FormControl<string | null>(null),
    location            : new FormControl<string | null>(null),
    lessonYear          : new FormControl<number | null>(null),
    comment             : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: StaffSchoolCareerService,
              private hrmCodeService: HrmCodeService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit() {
    this.getSchoolCareerTypeList();
    this.getSchoolCodeList();

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

    if (this.staff) {
      this.fg.controls.staffNo.setValue(this.staff?.staffNo);
      this.fg.controls.staffName.setValue(this.staff?.staffName);
    }
  }


  modifyForm(formData: StaffSchoolCareer) {
    this.formType = FormType.MODIFY;

    if (this.staff) {
      this.fg.controls.staffNo.setValue(this.staff?.staffNo);
      this.fg.controls.staffName.setValue(this.staff?.staffName);
    }

    //this.fg.get('database')?.disable();
    //this.fg.get('domainName')?.disable();

    this.fg.patchValue(formData);
  }


  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(staffId: string, seq: string): void {
    this.service
        .get(staffId, seq)
        .subscribe(
          (model: ResponseObject<StaffSchoolCareer>) => {
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
          (model: ResponseObject<StaffSchoolCareer>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  remove(staffId: string, seq: string): void {
    this.service
        .delete(staffId, seq)
        .subscribe(
          (model: ResponseObject<StaffSchoolCareer>) => {
            this.formDeleted.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  getSchoolCareerTypeList() {
    const params = {
      typeId : 'HR0009'
    };

    this.hrmCodeService
        .getList(params)
        .subscribe(
          (model: ResponseList<HrmCode>) => {
            if ( model.total > 0 ) {
              this.schoolCareerTypeList = model.data;
            } else {
              this.schoolCareerTypeList = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );
  }

  getSchoolCodeList() {
    const params = {
      typeId : 'HR0010'
    };

    this.hrmCodeService
        .getList(params)
        .subscribe(
          (model: ResponseList<HrmCode>) => {
            if ( model.total > 0 ) {
              this.schoolCodeList = model.data;
            } else {
              this.schoolCodeList = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );
  }

}
