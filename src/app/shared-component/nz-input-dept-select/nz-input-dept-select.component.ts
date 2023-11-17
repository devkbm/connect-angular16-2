import { Component, Self, Optional, Input, TemplateRef, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgModel, NgControl, FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzSelectModeType, NzSelectModule } from 'ng-zorro-antd/select';

import { ResponseList } from 'src/app/core/model/response-list';
import { NzInputDeptSelectModel } from './nz-input-dept-select.model';
import { NzInputDeptSelectService } from './nz-input-dept-select.service';

@Component({
  standalone: true,
  selector: 'app-nz-input-dept-select',
  imports: [FormsModule, NzFormModule, NzSelectModule],
  template: `
   <nz-form-item>
    <nz-form-label [nzFor]="itemId" [nzRequired]="required">
      <ng-content></ng-content>
    </nz-form-label>
    <nz-form-control [nzErrorTip]="nzErrorTip">
      <nz-select
          [nzId]="itemId"
          [(ngModel)]="_value"
          [nzDisabled]="disabled"
          [nzPlaceHolder]="placeholder"
          [nzMode]="mode"
          nzShowSearch
          (blur)="onTouched()"
          (ngModelChange)="onChange($event)">
        <nz-option *ngFor="let option of deptList"
          [nzLabel]="option[opt_label]"
          [nzValue]="option[opt_value]">
          </nz-option>
        </nz-select>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: []
})
export class NzInputDeptSelectComponent implements ControlValueAccessor, OnInit {

  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() opt_label: string = 'deptNameKorean';
  @Input() opt_value: 'deptId' | 'deptCode' = 'deptCode';
  @Input() mode: NzSelectModeType = 'default';

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  _value: any;

  deptList: NzInputDeptSelectModel[] = [];

  constructor(@Self()  @Optional() private ngControl: NgControl
             ,private service: NzInputDeptSelectService ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.getDeptList();
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  getDeptList(): void {
    const params = {isEnabled: true};

    this.service
         .getDeptList(params)
         .subscribe(
          (model: ResponseList<NzInputDeptSelectModel>) => {
            this.deptList = model.data;
          }
      );
  }

}
