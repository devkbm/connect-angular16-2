import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { BizCodeComponent } from './biz-code.component';
import { BizCodeTypeFormComponent } from './biz-code-type-form.component';
import { BizCodeTypeGridComponent } from './biz-code-type-grid.component';
import { BizCodeFormComponent } from './biz-code-form.component';
import { BizCodeGridComponent } from './biz-code-grid.component';
import { BizCodeTypeService } from './biz-code-type.service';
import { BizCodeService } from './biz-code.service';

import { NzPageHeaderCustomComponent } from 'src/app/shared-component/nz-page-header-custom/nz-page-header-custom.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzDrawerModule,
    NzDividerModule,
    NzPageHeaderCustomComponent,

    BizCodeTypeGridComponent,
    BizCodeGridComponent,
    BizCodeTypeFormComponent,
    BizCodeFormComponent
  ],
  declarations: [
    BizCodeComponent
  ],
  providers: [
    BizCodeTypeService,
    BizCodeService
  ],
  exports: [
    BizCodeComponent
  ]
})
export class BizCodeModule { }
