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
  selector: 'app-authority-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    NzInputTextComponent, NzInputTextareaComponent, NzCrudButtonGroupComponent
  ],
  template: `
    {{fg.getRawValue() | json}} - {{fg.valid}}

    <form nz-form [formGroup]="fg" nzLayout="vertical">
      <!-- 폼 오류 메시지 템플릿 -->
      <ng-template #errorTpl let-control>
        <ng-container *ngIf="control.hasError('required')">
          필수 입력 값입니다.
        </ng-container>
        <ng-container *ngIf="control.hasError('exists')">
          기존 코드가 존재합니다.
        </ng-container>
      </ng-template>

      <div class="card-1">
        <!--권한 필드-->
        <app-nz-input-text #authorityCode
          formControlName="authorityCode" itemId="authorityCode"
          placeholder="권한코드를 입력해주세요."
          [required]="true" [nzErrorTip]="errorTpl">권한코드
        </app-nz-input-text>

        <!--설명 필드-->
        <app-nz-input-textarea
          formControlName="description" itemId="description"
          placeholder="권한에 대한 설명을 입력해주세요."
          [rows]="20"
          [required]="false" [nzErrorTip]="errorTpl">설명
        </app-nz-input-textarea>
      </div>
    </form>

    <div class="footer">
      <app-nz-crud-button-group
        [searchVisible]="false"
        (closeClick)="closeForm()"
        (saveClick)="save()"
        (deleteClick)="remove()">
      </app-nz-crud-button-group>
    </div>


  `,
  styles: [`
    .footer {
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: 1px solid rgb(232, 232, 232);
        padding: 10px 16px;
        text-align: right;
        background-color: black;
        left: 0px;
    }

    .box {
        box-shadow:  0 6px 4px -4px rgba(0,0,0,0.7);
    }

    .box2 {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .card {
      border-radius: 2px;
      display: inline-block;
      height: 300px;
      margin: 1rem;
      position: relative;
      width: 300px;
    }

    .card-1 {
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    .card-1:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .card-2 {
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .card-3 {
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    .card-4 {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .card-5 {
      box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    }

    /* Shadows */
    .shadow-top {
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-right {
        box-shadow: 10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-bottom {
        box-shadow: 0 10px 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-left {
        box-shadow: -10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-all {
        box-shadow: 0 0 20px rgba(115,115,115,0.75);
    }
    .shadow-top-right{
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75),
                    10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-top-bottom{
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75),
                    0 10px 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-top-left{
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75),
                    -10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-bottom-right{
        box-shadow: 0 10px 20px -5px rgba(115,115,115,0.75),
                    10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-left-right{
        box-shadow: -10px 0 20px -5px rgba(115,115,115,0.75),
                    10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-bottom-left{
        box-shadow: 0 10px 20px -5px rgba(115,115,115,0.75),
                    -10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-top-bottom-right{
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75),
                    0 10px 20px -5px rgba(115,115,115,0.75),
                    10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-top-bottom-left{
        box-shadow: 0 -10px 20px -5px rgba(115,115,115,0.75),
                    0 10px 20px -5px rgba(115,115,115,0.75),
                    -10px 0 20px -5px rgba(115,115,115,0.75);
    }
    .shadow-inset {
        box-shadow: inset 0 0 20px rgba(115,115,115,0.75);
    }

  `]
})
export class AuthorityFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('authorityCode') authorityCode!: NzInputTextComponent;

  override fg = this.fb.group({
    authorityCode : new FormControl<string | null>('', {
                                                          validators: Validators.required,
                                                           asyncValidators: [existingAuthorityValidator(this.service)],
                                                           updateOn: 'blur'
                                                       }),
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
    this.fg.controls.authorityCode.setAsyncValidators(existingAuthorityValidator(this.service));

    this.fg.controls.authorityCode.enable();
  }

  modifyForm(formData: Authority): void {
    this.formType = FormType.MODIFY;

    this.fg.controls.authorityCode.setAsyncValidators(null);
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
        .deleteAuthority(this.fg.controls.authorityCode.value!)
        .subscribe(
          (model: ResponseObject<Authority>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

}
