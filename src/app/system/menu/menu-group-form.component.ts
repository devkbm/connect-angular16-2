import { CommonModule } from '@angular/common';

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseObject } from 'src/app/core/model/response-object';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

import { MenuService } from './menu.service';
import { MenuGroup } from './menu-group.model';
import { existingMenuGroupValidator } from './menu-group-duplication-validator.directive';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';

@Component({
  standalone: true,
  selector: 'app-menu-group-form',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    NzCrudButtonGroupComponent, NzInputTextComponent, NzInputTextareaComponent
  ],
  templateUrl: './menu-group-form.component.html',
  styleUrls: ['./menu-group-form.component.css']
})
export class MenuGroupFormComponent extends FormBase implements OnInit, AfterViewInit {

  @ViewChild('menuGroupCode') menuGroupCode!: NzInputTextComponent;

  override fg = this.fb.group({
    menuGroupId     : new FormControl<string | null>(null, {
      validators: Validators.required,
      asyncValidators: [existingMenuGroupValidator(this.menuService)],
      updateOn: 'blur'
    }),
    menuGroupCode   : new FormControl<string | null>(null, { validators: Validators.required }),
    menuGroupName   : new FormControl<string | null>(null, { validators: Validators.required }),
    description     : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
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

    this.fg.controls.menuGroupCode.valueChanges.subscribe(x => {
      if (x) {
        const organizationCode = sessionStorage.getItem('organizationCode');
        this.fg.controls.menuGroupId.setValue(organizationCode + x);
        this.fg.controls.menuGroupId.markAsTouched();
      } else {
        this.fg.controls.menuGroupId.setValue(null);
      }
    });

    this.menuGroupCode.focus();
  }

  modifyForm(formData: MenuGroup): void {
    this.formType = FormType.MODIFY;
    this.fg.controls.menuGroupId.disable();

    this.fg.patchValue(formData);
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(menuGroupId: string) {
    this.menuService
        .getMenuGroup(menuGroupId)
        .subscribe(
          (model: ResponseObject<MenuGroup>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  save() {
    if (this.fg.invalid) {
      this.checkForm()
      return;
    }

    this.menuService
        .registerMenuGroup(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<MenuGroup>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  remove() {
    this.menuService
        .deleteMenuGroup(this.fg.controls.menuGroupId.value!)
        .subscribe(
          (model: ResponseObject<MenuGroup>) => {
            this.formDeleted.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.total + '건의 메뉴그룹이 삭제되었습니다.');
          }
        );
  }

}
