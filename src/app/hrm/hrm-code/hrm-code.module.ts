import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzRadioModule } from 'ng-zorro-antd/radio';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';

import { HrmRelationCodeGridComponent } from './hrm-relation-code-grid.component';
import { HrmCodeGridComponent } from './hrm-code-grid.component';
import { HrmCodeTypeGridComponent } from './hrm-code-type-grid.component';
import { HrmCodeTypeFormComponent } from './hrm-code-type-form.component';
import { HrmTypeCodeFormComponent } from './hrm-code-form.component';
import { HrmRelationCodeFormComponent } from './hrm-relation-code-form.component';
import { HrmCodeComponent } from './hrm-code.component';
import { HrmRelationCodeComponent } from './hrm-relation-code.component';
import { HrmCodeService } from './hrm-code.service';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzInputCheckboxComponent } from 'src/app/shared/nz-input-checkbox/nz-input-checkbox.component';
import { NzInputNumberCustomComponent } from 'src/app/shared/nz-input-number-custom/nz-input-number-custom.component';
import { NzPageHeaderCustomComponent } from 'src/app/shared/nz-page-header-custom/nz-page-header-custom.component';

const nzModules = [
  NzLayoutModule,
  NzGridModule,
  NzFormModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzInputModule,
  NzDrawerModule,
  NzDividerModule,
  NzTreeModule,
  NzTabsModule,
  NzInputNumberModule,
  NzTreeSelectModule,
  NzDatePickerModule,
  NzButtonModule,
  NzAvatarModule,
  NzCardModule,
  NzUploadModule,
  NzRadioModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    nzModules,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzCrudButtonGroupComponent,
    NzInputCheckboxComponent,
    NzInputNumberCustomComponent,
    NzPageHeaderCustomComponent,
    HrmCodeGridComponent,
    HrmCodeTypeGridComponent,
    HrmRelationCodeGridComponent
  ],
  declarations: [
    HrmRelationCodeComponent,
    HrmRelationCodeFormComponent,
    HrmTypeCodeFormComponent,
    HrmCodeTypeFormComponent,
    HrmCodeComponent
  ],
  providers: [
    HrmCodeService
  ],
  exports: [
    HrmCodeComponent
  ]
})
export class HrmCodeModule { }
