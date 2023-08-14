import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzInputNumberCustomComponent } from 'src/app/shared/nz-input-number-custom/nz-input-number-custom.component';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { FormBase, FormType } from 'src/app/core/form/form-base';

import { ResponseObject } from 'src/app/core/model/response-object';

import { BizCodeService } from './biz-code.service';
import { BizCode } from './biz-code.model';
import { NzFormModule } from 'ng-zorro-antd/form';



@Component({
  standalone: true,
  selector: 'app-biz-code-form',
  imports:  [
    CommonModule, FormsModule, ReactiveFormsModule, NzFormModule,
    NzInputTextComponent, NzInputTextareaComponent, NzInputNumberCustomComponent, NzCrudButtonGroupComponent
  ],
  templateUrl: './biz-code-form.component.html',
  styleUrls: ['./biz-code-form.component.css']
})
export class BizCodeFormComponent extends FormBase implements OnInit, AfterViewInit {

  override fg = this.fb.group({
    typeId      : new FormControl<string | null>(null, { validators: [Validators.required] }),
    code        : new FormControl<string | null>(null, { validators: [Validators.required] }),
    codeName    : new FormControl<string | null>(null),
    useYn       : new FormControl<boolean | null>(null),
    sequence    : new FormControl<number | null>(null),
    comment     : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: BizCodeService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.initLoadId && this.initLoadId.typeId && this.initLoadId.code) {
      this.get(this.initLoadId.typeId, this.initLoadId.code);
    } else if (this.initLoadId && this.initLoadId.typeId) {
      this.newForm(this.initLoadId.typeId);
    }
  }

  newForm(typeId: string): void {
    this.formType = FormType.NEW;

    this.fg.controls.typeId.setValue(typeId);
    this.fg.controls.code.enable();
    this.fg.controls.useYn.setValue(true);
  }

  modifyForm(formData: BizCode): void {
    this.formType = FormType.MODIFY;

    this.fg.controls.code.disable();
    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(typeId: string, code: string): void {
    this.service
        .get(typeId, code)
        .subscribe(
          (model: ResponseObject<BizCode>) => {
            if (model.total > 0) {
              this.modifyForm(model.data);
            } else {
              this.newForm('');
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
          (model: ResponseObject<BizCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        )
  }

  remove(): void {
    this.service
        .delete(this.fg.controls.typeId.value!, this.fg.controls.code.value!)
        .subscribe(
          (model: ResponseObject<BizCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

}
