import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

import { HrmCodeTypeService } from './hrm-code-type.service';
import { HrmType } from './hrm-type.model';
import { existingHrmTypeValidator } from './hrm-code-type-duplication-validator';



@Component({
  selector: 'app-hrm-code-type-form',
  templateUrl: './hrm-code-type-form.component.html',
  styleUrls: ['./hrm-code-type-form.component.css']
})
export class HrmCodeTypeFormComponent extends FormBase implements OnInit, AfterViewInit {

  @ViewChild('typeId') typeId!: NzInputTextComponent;

  override fg = this.fb.group({
    typeId          : new FormControl<string | null>(null, {
                        validators: Validators.required,
                        asyncValidators: [existingHrmTypeValidator(this.service)],
                        updateOn: 'blur'
                      }),
    typeName        : new FormControl<string | null>(null, { validators: Validators.required }),
    sequence        : new FormControl<number | null>(0),
    comment         : new FormControl<string | null>(null),
    the1AddInfoDesc : new FormControl<string | null>(null),
    the2AddInfoDesc : new FormControl<string | null>(null),
    the3AddInfoDesc : new FormControl<string | null>(null),
    the4AddInfoDesc : new FormControl<string | null>(null),
    the5AddInfoDesc : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: HrmCodeTypeService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit() {

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

    this.fg.reset();
    this.fg.controls.typeId.enable();

    this.typeId.focus();
  }

  modifyForm(formData: HrmType): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
    this.fg.controls.typeId.disable();
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  select(param: any) {
    this.get(param.value['typeId']);
  }

  get(code: string): void {
    this.service
        .get(code)
        .subscribe(
          (model: ResponseObject<HrmType>) => {
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
    if (this.fg.invalid) {
      this.checkForm();
      return;
    }

    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<HrmType>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(): void {
    const id = this.fg.controls.typeId.value!;

    this.service
        .remove(id)
        .subscribe(
            (model: ResponseObject<HrmType>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            }
        );
  }

}

