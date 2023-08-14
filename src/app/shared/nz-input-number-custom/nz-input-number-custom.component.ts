import { Self, Optional, Component, Input, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgModel, NgControl, FormsModule } from '@angular/forms';
import { NzFormControlComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  standalone: true,
  selector: 'app-nz-input-number-custom',
  imports: [FormsModule, NzFormModule, NzInputNumberModule],
  template: `
    <!--{{formField.errors | json}}-->
    <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip">
        <nz-input-number
          [nzId]="itemId"
          [required]="required"
          [nzDisabled]="disabled"
          placeholder="placeholder"
          [(ngModel)]="_value"
          [nzMin]="1" [nzMax]="9999" [nzStep]="1"
          (ngModelChange)="onChange($event)"
          (blur)="onTouched()">
        </nz-input-number>
      </nz-form-control>
    </nz-form-item>
  `
})
export class NzInputNumberCustomComponent implements ControlValueAccessor, OnInit {

  @ViewChild(NzFormControlComponent, {static: true})
  control!: NzFormControlComponent;

  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  _value: any;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  constructor(@Self()  @Optional() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.control.nzValidateStatus = this.ngControl.control as AbstractControl;
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



}
