import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, FormsModule, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { ResponseList } from 'src/app/core/model/response-list';
import { DeptHierarchy } from './dept-hierarchy.model';
import { DeptHierarchyService } from './dept-hierarchy.service';

@Component({
  standalone: true,
  selector: 'app-nz-dept-tree-select',
  imports: [FormsModule, NzFormModule, NzTreeSelectModule],
  template: `
   <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control [nzErrorTip]="nzErrorTip">
       <nz-tree-select
            [nzId]="itemId"
            [ngModel]="value"
            [nzNodes]="nodes"
            [nzDisabled]="disabled"
            [nzPlaceHolder]="placeholder"
            (blur)="onTouched()"
            (ngModelChange)="onChange($event)">
        </nz-tree-select>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => NzDeptTreeSelectComponent
      ),
      multi: true
    }
  ]
})
export class NzDeptTreeSelectComponent implements ControlValueAccessor, OnInit {

  @Input() parentFormGroup?: FormGroup;
  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() nodes: any[] = [];

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  value!: string;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  private deptService = inject(DeptHierarchyService);

  ngOnInit(): void {
    this.getDeptHierarchy();
  }

  writeValue(obj: any): void {
    this.value = obj;
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

  getDeptHierarchy(): void {
    this.deptService
        .getDeptHierarchyList()
        .subscribe(
          (model: ResponseList<DeptHierarchy>) => {
            if (model.total > 0) {
              this.nodes = model.data;
            } else {
              this.nodes = [];
            }
          }
        );
  }
}
