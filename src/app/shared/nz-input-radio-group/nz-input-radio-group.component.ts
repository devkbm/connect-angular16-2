import { CommonModule } from '@angular/common';
import { Self, Optional, Component, Input, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgModel, NgControl, FormsModule } from '@angular/forms';
import { NzFormControlComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  standalone: true,
  selector: 'app-nz-input-radio-group',
  imports: [CommonModule, FormsModule, NzFormModule, NzRadioModule],
  template: `
   <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip">
        <nz-radio-group
          [nzDisabled]="disabled"
          [(ngModel)]="_value"
          (ngModelChange)="onChange($event)"
          (ngModelChange)="valueChange($event)"
          (blur)="onTouched()">
          <label nz-radio [nzValue]="o.value" *ngFor="let o of options">{{ o.label }}</label>
        </nz-radio-group>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: []
})
export class NzInputRadioGroupComponent implements ControlValueAccessor, OnInit {

  @ViewChild(NzFormControlComponent) control!: NzFormControlComponent;

  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() options?: {label: string, value: string}[];

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
    //this.control.nzValidateStatus = this.ngControl.control as AbstractControl;
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

  valueChange(val: any) {
    //console.log(val);
  }

}
