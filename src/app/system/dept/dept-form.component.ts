import { CommonModule } from '@angular/common';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzInputNumberCustomComponent } from 'src/app/shared/nz-input-number-custom/nz-input-number-custom.component';
import { NzInputDateComponent } from 'src/app/shared/nz-input-date/nz-input-date.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzFormModule } from 'ng-zorro-antd/form';

import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { DeptService } from './dept.service';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { existingDeptValidator } from './dept-duplication-validator.directive';

import { ResponseObject } from 'src/app/core/model/response-object';
import { FormBase, FormType } from 'src/app/core/form/form-base';
import { Dept } from './dept.model';
import { DeptHierarchy } from './dept-hierarchy.model';
import { ResponseList } from 'src/app/core/model/response-list';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';


@Component({
  standalone: true,
  selector: 'app-dept-form',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NzFormModule, NzTreeSelectModule,
    NzInputTextComponent, NzInputTextareaComponent, NzInputNumberCustomComponent,
    NzInputDateComponent
  ],
  templateUrl: './dept-form.component.html',
  styleUrls: ['./dept-form.component.css']
})
export class DeptFormComponent extends FormBase implements OnInit, AfterViewInit {

  @ViewChild('deptCode', {static: true}) deptCode!: NzInputTextComponent;

  deptHierarchy: DeptHierarchy[] = [];

  override fg = this.fb.group({
    parentDeptId            : new FormControl<string | null>(null),
    deptId                  : new FormControl<string | null>(null, {
                                validators: Validators.required,
                                asyncValidators: [existingDeptValidator(this.service)],
                                updateOn: 'blur'
                              }),
    deptCode                : new FormControl<string | null>(null),
    deptNameKorean          : new FormControl<string | null>(null, { validators: [Validators.required] }),
    deptAbbreviationKorean  : new FormControl<string | null>(null),
    deptNameEnglish         : new FormControl<string | null>(null, { validators: [Validators.required] }),
    deptAbbreviationEnglish : new FormControl<string | null>(null),
    fromDate                : new FormControl<Date | null>(null, { validators: [Validators.required] }),
    toDate                  : new FormControl<Date | null>(null, { validators: [Validators.required] }),
    seq                     : new FormControl<number | null>(1, { validators: [Validators.required] }),
    comment                 : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: DeptService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit(): void {
    this.getDeptHierarchy();
    this.newForm();
  }

  ngAfterViewInit(): void {
    this.deptCode.focus();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.controls.deptId.setAsyncValidators(existingDeptValidator(this.service));
    this.fg.controls.deptCode.enable();

    this.fg.controls.deptCode.valueChanges.subscribe(value => {
      if (value === null) return;
      const organizationCode = sessionStorage.getItem('organizationCode');
      this.fg.controls.deptId.setValue(organizationCode + value);
    });

    /*
    this.fg.patchValue({
      fromDate: dateFns.format(new Date(), "yyyy-MM-dd"),
      toDate: dateFns.format(new Date(9999,11,31), "yyyy-MM-dd"),
      seq: 1
    });
    */

    this.deptCode.focus();
  }

  modifyForm(formData: Dept): void {
    this.formType = FormType.MODIFY;

    this.getDeptHierarchy();

    this.fg.get('deptId')?.setAsyncValidators(null);
    this.fg.get('deptCode')?.disable();

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: string): void {
    this.service
        .getDept(id)
        .subscribe(
            (model: ResponseObject<Dept>) => {
              if ( model.total > 0 ) {
                this.modifyForm(model.data);
              } else {
                this.getDeptHierarchy();
                this.newForm();
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
        .saveDept(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Dept>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(): void {
    this.service
        .deleteDept(this.fg.controls.deptId.value!)
        .subscribe(
            (model: ResponseObject<Dept>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            }
        );
  }

  getDeptHierarchy(): void {
    this.service
        .getDeptHierarchyList()
        .subscribe(
          (model: ResponseList<DeptHierarchy>) => {
            if ( model.total > 0 ) {
              this.deptHierarchy = model.data;
            } else {
              this.deptHierarchy = [];
            }
          }
        );
  }

}
