import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseObject } from 'src/app/core/model/response-object';

import { Authority } from './authority.model';
import { existingAuthorityValidator } from './authority-duplication-validator.directive';
import { AuthorityService } from './authority.service';

import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';


@Component({
  standalone: true,
  selector: 'app-authority-form',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    NzInputTextComponent, NzInputTextareaComponent, NzCrudButtonGroupComponent
  ],
  templateUrl: './authority-form.component.html',
  styleUrls: ['./authority-form.component.css']
})
export class AuthorityFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('authorityCode') authorityCode!: NzInputTextComponent;

  override fg = this.fb.group({
    id: new FormControl<string | null>(null, {
                                              validators: Validators.required,
                                                asyncValidators: [existingAuthorityValidator(this.service)],
                                                updateOn: 'blur'
                                             }),
    authorityCode : new FormControl<string | null>('', { validators: [Validators.required] }),
    description   : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: AuthorityService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit() {
    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }
  }

  ngAfterViewInit(): void {
    this.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*
    if (changes['initLoadId']) {
      this.getAuthority(changes['initLoadId'].currentValue);
    }
    */
  }

  focus() {
    this.authorityCode.focus();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.controls.id.setAsyncValidators(existingAuthorityValidator(this.service));
    this.fg.controls.authorityCode.valueChanges.subscribe(x => {
      if (x === null) return;
      const organizationCode = sessionStorage.getItem('organizationCode');
      this.fg.get('id')?.setValue(organizationCode + x);
      this.fg.get('id')?.markAsTouched();
    });

    this.fg.controls.authorityCode.enable();
  }

  modifyForm(formData: Authority): void {
    this.formType = FormType.MODIFY;

    this.fg.controls.id.setAsyncValidators(null);
    this.fg.controls.authorityCode.disable();

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: string): void {
    this.service
        .getAuthority(id)
        .subscribe(
          (model: ResponseObject<Authority>) => {
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
      this.checkForm();
      return;
    }

    this.service
        .registerAuthority(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Authority>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(): void {
    this.service
        .deleteAuthority(this.fg.controls.id.value!)
        .subscribe(
          (model: ResponseObject<Authority>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

}
