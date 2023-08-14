import { Self, Optional, Component, Input, TemplateRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgModel, NgControl, FormsModule } from '@angular/forms';
import { NzFormControlComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import * as dateFns from "date-fns";

@Component({
  standalone: true,
  selector: 'app-nz-input-date',
  imports: [FormsModule, NzFormModule, NzDatePickerModule],
  template: `
    <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip">
        <!-- (ngModelChange)="onChange($event)" -->
        <nz-date-picker #inputControl
              [nzId]="itemId"
              [nzPlaceHolder]="placeholder"
              [required]="required"
              [nzDisabled]="disabled"
              [nzInputReadOnly]="readonly"
              nzAllowClear="false"
              [(ngModel)]="_value"
              (ngModelChange)="valueChange($event)"
              (blur)="onTouched()">
        </nz-date-picker>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [`
    nz-date-picker {
      width: 140px
    }
  `]
})
export class NzInputDateComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild(NzFormControlComponent) control!: NzFormControlComponent;
  @ViewChild('inputControl') element?: NzDatePickerComponent;

  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  _value: any;

  onChange!: (value: string | null) => void;
  onTouched!: () => void;

  constructor(@Self()  @Optional() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.control) {
      this.control.nzValidateStatus = this.ngControl.control as AbstractControl;
    }
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  focus(): void {
    this.element?.focus();
  }

  valueChange(val: Date) {
    this._value = val;
    const nativeValue = this.element?.pickerInput?.nativeElement.value as string;
    // keyboard로 8자리 숫자입력 받을 경우 Date로 변환 처리
    if (nativeValue.length === 8) {
      this._value = this.convert(nativeValue);
    }

    if (this._value !== null) {
      this.onChange(dateFns.format(this._value, "yyyy-MM-dd"));
    } else {
      this.onChange(null);
      this.focus();
    }
  }

  convert(dateStr: string): Date | null {
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    const convertValue = dateStr.replace(reg,'');

    if (dateStr.length >= 8) {
      const year = convertValue.substring(0,4);
      const month = convertValue.substring(4,6);
      const day = convertValue.substring(6,8);
      const dateStr = year + '-' + month + '-' + day;
      const dateNum = Date.parse(dateStr);
      // Validate Date String
      if (!isNaN(dateNum)) {
        return new Date(dateStr);
      }
    }

    return null;
  }

}
