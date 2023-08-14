import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzInputTreeSelectComponent } from 'src/app/shared/nz-input-tree-select/nz-input-tree-select.component';
import { NzInputSelectComponent } from 'src/app/shared/nz-input-select/nz-input-select.component';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { CommonCodeService } from './common-code.service';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { ResponseObject } from 'src/app/core/model/response-object';
import { CommonCode } from './common-code.model';
import { CommonCodeHierarchy } from './common-code-hierarchy.model';
import { ResponseList } from 'src/app/core/model/response-list';
import { FormBase, FormType } from 'src/app/core/form/form-base';
import { SystemTypeEnum } from './system-type-enum.model';

@Component({
  standalone: true,
  selector: 'app-common-code-form',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    NzFormModule, NzInputModule, NzInputNumberModule,
    NzInputTextComponent, NzInputTextareaComponent, NzInputTreeSelectComponent, NzInputSelectComponent
  ],
  templateUrl: './common-code-form.component.html',
  styleUrls: ['./common-code-form.component.css']
})
export class CommonCodeFormComponent extends FormBase implements OnInit {

  nodeItems: CommonCodeHierarchy[] = [];
  systemTypeCodeList: SystemTypeEnum[] = [];

  override fg = this.fb.group({
    systemTypeCode          : new FormControl<string | null>(null),
    codeId                  : new FormControl<string | null>(null),
    parentId                : new FormControl<string | null>(null),
    code                    : new FormControl<string | null>(null, { validators: [Validators.required] }),
    codeName                : new FormControl<string | null>(null, { validators: [Validators.required] }),
    codeNameAbbreviation    : new FormControl<string | null>(null),
    fromDate                : new FormControl<Date | null>(null, { validators: [Validators.required] }),
    toDate                  : new FormControl<Date | null>(null, { validators: [Validators.required] }),
    hierarchyLevel          : new FormControl<number | null>(null),
    seq                     : new FormControl<number | null>(null),
    lowLevelCodeLength      : new FormControl<number | null>(null),
    cmt                     : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private commonCodeService: CommonCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {
    this.getCommonCodeHierarchy('');
    this.getSystemTypeCode();
  }

  newForm(systemTypeCode: string, parentId: any): void {
    this.formType = FormType.NEW;
    this.fg.reset();

    this.fg.get('codeId')?.disable();
    this.fg.get('code')?.enable();
    this.fg.get('systemTypeCode')?.enable();
    this.fg.get('systemTypeCode')?.setValue(systemTypeCode);
    this.fg.get('parentId')?.setValue(parentId);
    this.fg.get('seq')?.setValue(1);
    this.fg.get('lowLevelCodeLength')?.setValue(0);
    this.fg.get('fromDate')?.setValue(new Date());
    this.fg.get('toDate')?.setValue(new Date(9999, 11, 31));
  }

  modifyForm(formData: CommonCode): void {
    this.formType = FormType.MODIFY;

    this.fg.get('codeId')?.disable();
    this.fg.get('code')?.disable();
    this.fg.get('systemTypeCode')?.disable();
    this.fg.get('parentId')?.disable();

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(systemTypeCode: string, codeId: string): void {
    this.commonCodeService
        .getCode(systemTypeCode, codeId)
        .subscribe(
          (model: ResponseObject<CommonCode>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
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

    this.commonCodeService
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<CommonCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(): void {
    this.commonCodeService
        .remove(this.fg.controls.systemTypeCode.value!, this.fg.controls.codeId.value!)
        .subscribe(
          (model: ResponseObject<CommonCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  getSystemTypeCode(): void {
    this.commonCodeService
      .getSystemTypeList()
      .subscribe(
        (model: ResponseList<SystemTypeEnum>) => {
          this.systemTypeCodeList = model.data;
        }
      );
  }

  getCommonCodeHierarchy(systemTypeCode: string): void {
    const params = {
      systemTypeCode: systemTypeCode
    };

    this.commonCodeService
        .getCodeHierarchy(params)
        .subscribe(
          (model: ResponseList<CommonCodeHierarchy>) => {
            if ( model.total > 0 ) {
              this.nodeItems = model.data;
            } else {
              this.nodeItems = new Array<CommonCodeHierarchy>(0);
            }
          }
        );
  }

}
