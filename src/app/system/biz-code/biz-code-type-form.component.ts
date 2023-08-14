import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzInputNumberCustomComponent } from 'src/app/shared/nz-input-number-custom/nz-input-number-custom.component';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzInputSelectComponent } from 'src/app/shared/nz-input-select/nz-input-select.component';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { FormBase, FormType } from 'src/app/core/form/form-base';

import { ResponseObject } from 'src/app/core/model/response-object';
import { ResponseList } from 'src/app/core/model/response-list';

import { BizCodeType } from './biz-code-type.model';
import { BizCodeTypeService } from './biz-code-type.service';
import { SelectControlModel } from 'src/app/core/model/select-control.model.ts';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  standalone: true,
  selector: 'app-biz-code-type-form',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NzFormModule,
    NzInputTextComponent, NzInputTextareaComponent, NzInputNumberCustomComponent, NzCrudButtonGroupComponent, NzInputSelectComponent
  ],
  templateUrl: './biz-code-type-form.component.html',
  styleUrls: ['./biz-code-type-form.component.css']
})
export class BizCodeTypeFormComponent extends FormBase implements OnInit, AfterViewInit {

  bizTypeList: SelectControlModel[] = [];

  override fg = this.fb.group({
    typeId    : new FormControl<string | null>(null, { validators: [Validators.required] }),
    typeName  : new FormControl<string | null>(null, { validators: [Validators.required] }),
    sequence  : new FormControl<number | null>(null),
    bizType   : new FormControl<string | null>(null, { validators: [Validators.required] }),
    comment   : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: BizCodeTypeService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit(): void {
    this.getSystemList();
  }

  ngAfterViewInit(): void {
    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }
  }

  newForm(): void {
    this.formType = FormType.NEW;
  }

  modifyForm(formData: BizCodeType): void {
    this.formType = FormType.MODIFY;
    this.fg.controls.typeId.disable();

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: string): void {
    this.service
        .get(id)
        .subscribe(
          (model: ResponseObject<BizCodeType>) => {
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
      this.checkForm()
      return;
    }

    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<BizCodeType>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        )
  }

  remove(): void {
    this.service
        .delete(this.fg.controls.typeId.value!)
        .subscribe(
          (model: ResponseObject<BizCodeType>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  getSystemList(): void {
    this.service
        .getSystemList()
        .subscribe(
          (model: ResponseList<SelectControlModel>) => {
            if (model.total > 0) {
              this.bizTypeList = model.data;
            } else {
              this.bizTypeList = [];
            }
          }
        );
  }
}
