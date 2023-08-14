import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { DeptService } from 'src/app/system/dept/dept.service';
import { HrmCode } from '../../hrm-code/hrm-code.model';
import { HrmCodeService } from '../../hrm-code/hrm-code.service';

import { StaffAppointmentRecord } from './staff-appointment-record.model';
import { StaffAppointmentRecordService } from './staff-appointment-record.service';

@Component({
  selector: 'app-staff-appointment-record-form',
  templateUrl: './staff-appointment-record-form.component.html',
  styleUrls: ['./staff-appointment-record-form.component.css']
})
export class StaffAppointmentRecordFormComponent extends FormBase implements OnInit {

  @Input() staff?: {organizationCode: string, staffNo: string, staffName: string};

  bizTypeList = [{code:'code', name:'name'},{code:'code2', name:'name2'}];

  /**
   * https://soopdop.github.io/2020/12/01/index-signatures-in-typescript/
   * string literal로 접근하기위한 변수
   */
  [key: string]: any;

  /**
   * 발령분류코드 - HR0000
   */
  appointmentTypeList: HrmCode[] = [];
  /**
   * 직군코드 - HR0001
   */
  groupJobCodeList: HrmCode[] = [];
  /**
   * 직위코드 - HR0002
   */
  jobPositionCodeList: HrmCode[] = [];
  /**
   * 직종코드 - HR0003
   */
  occupationCodeList: HrmCode[] = [];
  /**
   * 직급코드 - HR0004
   */
  jobGradeCodeList: HrmCode[] = [];
  /**
   * 호봉코드 - HR0005
   */
  payStepCodeList: HrmCode[] = [];
  /**
   * 직무코드 - HR0006
   */
  jobCodeList: HrmCode[] = [];
  /**
   * 직책코드 - HR0007
   */
  dutyResponsibilityCodeList: HrmCode[] = [];

  override fg = this.fb.group({
      staffNo                 : new FormControl<string | null>(null, { validators: Validators.required }),
      staffName               : new FormControl<string | null>(null),
      seq                     : new FormControl<string | null>(null),
      appointmentTypeCode     : new FormControl<string | null>(null),
      appointmentDate         : new FormControl<Date | null>(null),
      appointmentEndDate      : new FormControl<Date | null>(null),
      recordName              : new FormControl<string | null>(null),
      comment                 : new FormControl<string | null>(null),
      isCompleted             : new FormControl<boolean | null>(null),
      blngDeptId              : new FormControl<string | null>(null),
      workDeptId              : new FormControl<string | null>(null),
      jobGroupCode            : new FormControl<string | null>(null),
      jobPositionCode         : new FormControl<string | null>(null),
      occupationCode          : new FormControl<string | null>(null),
      jobGradeCode            : new FormControl<string | null>(null),
      payStepCode             : new FormControl<string | null>(null),
      jobCode                 : new FormControl<string | null>(null),
      dutyResponsibilityCode  : new FormControl<string | null>(null)
    });

  constructor(private fb: FormBuilder,
              private service: StaffAppointmentRecordService,
              private hrmCodeService: HrmCodeService,
              private deptService: DeptService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit(): void {
    this.getHrmTypeDetailCodeList('HR0000', "appointmentTypeList");
    this.getHrmTypeDetailCodeList('HR0001', "groupJobCodeList");
    this.getHrmTypeDetailCodeList('HR0002', "jobPositionCodeList");
    this.getHrmTypeDetailCodeList('HR0003', "occupationCodeList");
    this.getHrmTypeDetailCodeList('HR0004', "jobGradeCodeList");
    this.getHrmTypeDetailCodeList('HR0005', "payStepCodeList");
    this.getHrmTypeDetailCodeList('HR0006', "jobCodeList");
    this.getHrmTypeDetailCodeList('HR0007', "dutyResponsibilityCodeList");

    if (this.initLoadId) {
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
      //this.fg.controls.staffId.setValue(this.staff?.staffId);
      this.fg.controls.staffNo.setValue(this.staff?.staffNo);
      this.fg.controls.staffName.setValue(this.staff?.staffName);
    }

  }

  modifyForm(formData: StaffAppointmentRecord): void {
    this.formType = FormType.MODIFY;

    this.fg.controls.staffNo.disable();
    this.fg.controls.staffName.disable();

    this.fg.patchValue(formData);
  }

  closeForm() {
    //grid.getGridList(this.fg.get('staffId')?.value);
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(staffId: string, id: string): void {

    this.service
        .get(staffId, id)
        .subscribe(
          (model: ResponseObject<StaffAppointmentRecord>) => {
            if ( model.total > 0 ) {
              console.log(model.data);
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );
  }

  save(): void {
    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<StaffAppointmentRecord>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(staffId: string, id: string): void {
    this.service
        .delete(staffId, id)
        .subscribe(
          (model: ResponseObject<StaffAppointmentRecord>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  // [key: string]: any
  getHrmTypeDetailCodeList(typeId: string, propertyName: string): void {
    const params = {
      typeId : typeId
    };

    this.hrmCodeService
        .getList(params)
        .subscribe(
          (model: ResponseList<HrmCode>) => {
            if ( model.total > 0 ) {
              this[propertyName] = model.data;
            } else {
              //list = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );

  }

  /*
  private getDeptList(): void {
    this.deptService
        .getDeptList()
        .subscribe(
          (model: ResponseList<Dept>) => {
            this.deptList = model.data;
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }
  */

}
