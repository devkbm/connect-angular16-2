import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { HrmCodeGridComponent } from './hrm-code-grid.component';
import { HrmCodeTypeGridComponent } from './hrm-code-type-grid.component';
import { HrmCodeTypeFormComponent } from './hrm-code-type-form.component';
import { HrmTypeCodeFormComponent } from './hrm-code-form.component';
import { HrmCodeComponent } from './hrm-code.component';
import { HrmCodeService } from './hrm-code.service';

import { NzPageHeaderCustomComponent } from 'src/app/shared-component/nz-page-header-custom/nz-page-header-custom.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /* NG-ZORRO */
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    NzDrawerModule,
    NzSelectModule,
    NzPageHeaderModule,
    NzInputModule,

    NzPageHeaderCustomComponent,
    HrmCodeGridComponent,
    HrmCodeTypeGridComponent,
    HrmTypeCodeFormComponent,
    HrmCodeTypeFormComponent,
  ],
  declarations: [
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
