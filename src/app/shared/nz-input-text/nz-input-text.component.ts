import { Self, Optional, Component, ElementRef, Input, TemplateRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgModel, NgControl, FormsModule } from '@angular/forms';
import { NzFormControlComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

/*
,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => NzInputTextComponent
      ),
      multi: true
    }
  ]
*/

@Component({
  standalone: true,
  selector: 'app-nz-input-text',
  imports: [FormsModule, NzFormModule, NzInputModule],
  template: `
    <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip">
        <input #inputControl nz-input
              [required]="required"
              [disabled]="disabled"
              [id]="itemId"
              [placeholder]="placeholder"
              [(ngModel)]="_value"
              [readonly]="readonly"
              (ngModelChange)="onChange($event)"
              (ngModelChange)="valueChange($event)"
              (blur)="onTouched()"/>
      </nz-form-control>
    </nz-form-item>
  `
})
export class NzInputTextComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild(NzFormControlComponent) control!: NzFormControlComponent;
  @ViewChild('inputControl') element?: ElementRef<HTMLInputElement>;

  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;

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
    this.element?.nativeElement.focus();
  }

  valueChange(val: any) {
    //console.log(val);
  }

}
