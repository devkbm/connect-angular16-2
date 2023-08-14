import { CommonModule } from '@angular/common';
import { Self, Optional, Component, Input, TemplateRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgModel, NgControl, FormsModule } from '@angular/forms';
import { NzFormControlComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModeType, NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  standalone: true,
  selector: 'app-nz-input-select',
  imports: [CommonModule, FormsModule, NzFormModule, NzSelectModule],
  template: `
   <!--{{formField.errors | json}}-->
   <nz-form-item>
    <nz-form-label [nzFor]="itemId" [nzRequired]="required">
      <ng-content></ng-content>
    </nz-form-label>
    <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip">
      <nz-select
          [nzId]="itemId"
          [(ngModel)]="_value"
          [nzDisabled]="disabled"
          [nzPlaceHolder]="placeholder"
          [nzMode]="mode"
          nzShowSearch
          (blur)="onTouched()"
          (ngModelChange)="onChange($event)">
        <nz-option *ngFor="let option of options; let i=index;"
          [nzLabel]="custom_label ? custom_label(option, i) : option[opt_label]"
          [nzValue]="option[opt_value]">asf
          </nz-option>
        </nz-select>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: []
})
export class NzInputSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild(NzFormControlComponent) control!: NzFormControlComponent;

  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() mode: NzSelectModeType = 'default';
  @Input() options!: any[];
  @Input() opt_label: string = 'label';
  @Input() opt_value: string = 'value';
  @Input() custom_label?: (option: any, index: number) => {};

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  _value: any;

  constructor(@Self()  @Optional() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    //this.control.nzValidateStatus = this.ngControl.control as AbstractControl;
  }

  ngAfterViewInit(): void {
    if (this.control) {
      this.control.nzValidateStatus = this.ngControl.control as AbstractControl;
    }
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
}
