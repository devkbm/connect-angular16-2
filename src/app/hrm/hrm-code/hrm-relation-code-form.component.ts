import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { ResponseList } from 'src/app/core/model/response-list';
import { CommonCodeService } from 'src/app/system/commoncode/common-code.service';
import { HrmCodeService } from './hrm-code.service';
import { HrmRelationCode } from './hrm-relation-code';
import { HrmCode } from './hrm-code.model';


@Component({
  selector: 'app-hrm-relation-code-form',
  templateUrl: './hrm-relation-code-form.component.html',
  styleUrls: ['./hrm-relation-code-form.component.css']
})
export class HrmRelationCodeFormComponent extends FormBase implements OnInit {

  commonCodeList: any[] = [];
  parentHrmTypeList: any[] = [];
  parentHrmDetailCodeList: any[] = [];
  childHrmTypeList: any[] = [];
  childHrmDetailCodeList: any[] = [];

  constructor(private fb:FormBuilder,
              private hrmCodeService: HrmCodeService,
              private commonCodeService: CommonCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      relationId      : [ null, [ Validators.required ] ], //new FormControl(fkBoard, {validators: Validators.required}),
      relCode         : [ null, [ Validators.required ] ],
      parentTypeId    : [ null, [ Validators.required ] ],
      parentDetailId  : [ null, [ Validators.required ] ],
      childTypeId     : [ null, [ Validators.required ] ],
      childDetailId   : [ null, [ Validators.required ] ]
    });

    this.getCommonCode();

    this.getTypeCodeList(true, 'JOB');
    this.getTypeCodeList(false, 'JOB');

    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    /**
     * 컨트롤 초기값 설정
     */
    this.fg.reset();
    //this.fg.controls.typeId.setValue(typeId);
    //this.fg.controls.useYn.setValue(true);

    /**
     * 컨트롤 설정
     */
  }

  public modifyForm(formData: HrmRelationCode): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);

    //this.fg.controls.code.disable();
  }

  public selectParentId(param: any) {
    console.log(param);
    this.getHrmTypeDetail(true, param);
  }

  public selectChildId(param: any) {
    console.log(param);
    this.getHrmTypeDetail(false, param);
  }

  public getCommonCode(): void {
    this.commonCodeService
        .getCommonCodeListByParentId('HRMREL')
        .subscribe(
          (model: ResponseList<any>) => {
            if ( model.total > 0 ) {
              this.commonCodeList = model.data;
            } else {
              this.commonCodeList = [];
            }
          }
      );
  }

  public getTypeCodeList(isParent: boolean, typeId: string): void {
    /*
    this.appointmentCodeService
        .getTypeCodeList(typeId)
        .subscribe(
          (model: ResponseList<any>) => {
            if (isParent) {
              if ( model.total > 0 ) {
                this.parentHrmTypeList = model.data;
              } else {
                this.parentHrmTypeList = [];
              }
            } else {
              if ( model.total > 0 ) {
                this.childHrmTypeList = model.data;
              } else {
                this.childHrmTypeList = [];
              }
            }
            //this.fg.get('changeTypeDetail').setValue(null);
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
      */
  }

  public getHrmTypeDetail(isParent: boolean, typeId: string): void {
    this.hrmCodeService
        .getList({typeId: typeId})
        .subscribe(
          (model: ResponseList<HrmCode>) => {
            if (isParent) {
              this.parentHrmDetailCodeList = model.data;
            } else {
              this.childHrmDetailCodeList = model.data;
            }
          }
      );
  }

  public getHrmRelationCode(id: string): void {
    this.hrmCodeService
        .getHrmRelationCode(id)
        .subscribe(
          (model: ResponseObject<HrmRelationCode>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );
  }

  public submitForm(): void {
    this.hrmCodeService
        .saveHrmRelationCode(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<HrmRelationCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  public deleteHrmRelationCode(id: string): void {
    this.hrmCodeService
        .deleteHrmRelationCode(id)
        .subscribe(
            (model: ResponseObject<HrmRelationCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            }
        );
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }
}
