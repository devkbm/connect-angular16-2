import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputSelectComponent } from 'src/app/shared/nz-input-select/nz-input-select.component';
import { NzInputDateComponent } from 'src/app/shared/nz-input-date/nz-input-date.component';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzDeptTreeSelectComponent } from 'src/app/shared/nz-dept-tree-select/nz-dept-tree-select.component';

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    NzFormModule, NzDividerModule, NzInputTextComponent, NzInputSelectComponent, NzInputDateComponent, NzCrudButtonGroupComponent,
    NzDeptTreeSelectComponent
  ],
  template: `
    {{fg.value | json}}
    <form nz-form [formGroup]="fg" nzLayout="vertical">

      <!-- ERROR TEMPLATE-->
      <ng-template #errorTpl let-control>
        <ng-container *ngIf="control.hasError('required')">
          필수 입력 값입니다.
        </ng-container>
      </ng-template>

      <!-- 1 row -->
      <div nz-row nzGutter="8">

        <div nz-col nzSpan="8">
          <app-nz-input-text
            formControlName="staffNo" itemId="staffNo"
            placeholder="직원번호를 입력해주세요."
            [required]="true" [nzErrorTip]="errorTpl">직원번호
          </app-nz-input-text>
        </div>

        <div nz-col nzSpan="8">
          <app-nz-input-text
            formControlName="staffName" itemId="staffName"
            placeholder="직원명을 입력해주세요."
            [required]="true" [nzErrorTip]="errorTpl">직원명
          </app-nz-input-text>
        </div>
      </div>

      <!-- 2 row -->
      <div nz-row nzGutter="8">

        <div nz-col nzSpan="6">
          <app-nz-input-text
            formControlName="seq" itemId="seq"
            placeholder="신규"
            [required]="false" [readonly]="true" [nzErrorTip]="errorTpl">발령순번
          </app-nz-input-text>
        </div>

        <div nz-col nzSpan="6">

          <app-nz-input-select
            formControlName="appointmentTypeCode" itemId="appointmentTypeCode"
            [options]="appointmentTypeList" [opt_value]="'code'" [opt_label]="'codeName'"
            [placeholder]="'Please select'"
            [nzErrorTip]="errorTpl" [required]="true">발령분류
          </app-nz-input-select>
          <!--
          <app-nz-input-text
            formControlName="appointmentTypeCode" itemId="appointmentTypeCode"
            placeholder=""
            [required]="false" [nzErrorTip]="errorTpl">발령분류
          </app-nz-input-text>
          -->
        </div>

        <div nz-col nzSpan="6">
          <app-nz-input-date
            formControlName="appointmentDate" itemId="appointmentDate"
            [required]="true" [nzErrorTip]="errorTpl">발령일
          </app-nz-input-date>
        </div>

        <div nz-col nzSpan="6">
          <app-nz-input-date
            formControlName="appointmentEndDate" itemId="appointmentEndDate"
            [required]="false" [nzErrorTip]="errorTpl">발령종료일
          </app-nz-input-date>
        </div>
      </div>

      <!-- 3 row -->
      <div nz-row nzGutter="8">
        <div nz-col nzSpan="12">
          <app-nz-input-text
            formControlName="recordName" itemId="recordName"
            placeholder="발령내용을 입력해주세요."
            [required]="true" [nzErrorTip]="errorTpl">발령내용
          </app-nz-input-text>
        </div>

        <div nz-col nzSpan="12">
          <app-nz-input-text
            formControlName="comment" itemId="comment"
            placeholder="비고내용을 입력해주세요."
            [required]="false" [nzErrorTip]="errorTpl">비고
          </app-nz-input-text>
        </div>

      </div>

      <nz-divider nzPlain nzText="발령" nzOrientation="center"></nz-divider>
      <!-- 4 row -->
      <div nz-row nzGutter="8">
        <div nz-col nzSpan="12">
          <app-nz-dept-tree-select
            formControlName="blngDeptCode"
            placeholder="부서 없음">소속부서
          </app-nz-dept-tree-select>
        </div>

        <div nz-col nzSpan="12">
          <app-nz-dept-tree-select
            formControlName="workDeptCode"
            placeholder="부서 없음">근무부서
          </app-nz-dept-tree-select>
        </div>

      </div>


      <!-- 5 row -->
      <div nz-row nzGutter="8">
        <div nz-col nzSpan="12">
          <app-nz-input-select
            formControlName="jobGroupCode" itemId="jobGroupCode"
            [options]="groupJobCodeList" [opt_value]="'code'" [opt_label]="'codeName'"
            [placeholder]="'Please select'"
            [nzErrorTip]="errorTpl" [required]="true">직군
          </app-nz-input-select>
        </div>

        <div nz-col nzSpan="12">
          <app-nz-input-select
            formControlName="jobPositionCode" itemId="jobPositionCode"
            [options]="jobPositionCodeList" [opt_value]="'code'" [opt_label]="'codeName'"
            [placeholder]="'Please select'"
            [nzErrorTip]="errorTpl" [required]="true">직위
          </app-nz-input-select>
        </div>
      </div>

      <!-- 6 row-->
      <div nz-row nzGutter="8">
        <div nz-col nzSpan="12">
          <app-nz-input-select
            formControlName="occupationCode" itemId="occupationCode"
            [options]="occupationCodeList" [opt_value]="'code'" [opt_label]="'codeName'"
            [placeholder]="'Please select'"
            [nzErrorTip]="errorTpl" [required]="true">직종
          </app-nz-input-select>
        </div>

        <div nz-col nzSpan="12">
          <app-nz-input-select
            formControlName="jobGradeCode" itemId="jobGradeCode"
            [options]="jobGradeCodeList" [opt_value]="'code'" [opt_label]="'codeName'"
            [placeholder]="'Please select'"
            [nzErrorTip]="errorTpl" [required]="true">직급
          </app-nz-input-select>
        </div>
      </div>

      <!-- 7 row-->
      <div nz-row nzGutter="8">
        <div nz-col nzSpan="12">
          <app-nz-input-select
            formControlName="payStepCode" itemId="payStepCode"
            [options]="payStepCodeList" [opt_value]="'code'" [opt_label]="'codeName'"
            [placeholder]="'Please select'"
            [nzErrorTip]="errorTpl" [required]="true">호봉
          </app-nz-input-select>
        </div>

        <div nz-col nzSpan="12">
          <app-nz-input-select
            formControlName="jobCode" itemId="jobCode"
            [options]="jobCodeList" [opt_value]="'code'" [opt_label]="'codeName'"
            [placeholder]="'Please select'"
            [nzErrorTip]="errorTpl" [required]="true">직무
          </app-nz-input-select>
        </div>
      </div>

      <!-- 8 row-->
      <div nz-row nzGutter="8">
        <div nz-col nzSpan="12">
          <app-nz-input-select
            formControlName="dutyResponsibilityCode" itemId="dutyResponsibilityCode"
            [options]="dutyResponsibilityCodeList" [opt_value]="'code'" [opt_label]="'codeName'"
            [placeholder]="'Please select'"
            [nzErrorTip]="errorTpl" [required]="true">직책
          </app-nz-input-select>
        </div>
      </div>
    </form>

    <div class="footer">
      <app-nz-crud-button-group
        (searchClick)="get(fg.value.staffNo!, fg.value.seq!)"
        (closeClick)="closeForm()"
        (saveClick)="save()"
        (deleteClick)="remove(fg.value.staffNo!, fg.value.seq!)">
      </app-nz-crud-button-group>
    </div>

  `,
  styles: [`
    [nz-button] {
      margin-right: 8px;
    }

    .form-item {
      margin-top: 0px;
      margin-bottom: 5px;
    }

    .btn-group {
      padding: 6px;
      /*background: #fbfbfb;*/
      border: 1px solid #d9d9d9;
      border-radius: 6px;
    }

    .footer {
      position: absolute;
      bottom: 10px;
      width: 100%;
      border-top: 1px solid rgb(232, 232, 232);
      padding: 10px 16px;
      text-align: right;
      left: 0px;
      /*background: #fff;*/
    }

  `]
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
      blngDeptCode            : new FormControl<string | null>(null),
      workDeptCode            : new FormControl<string | null>(null),
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
