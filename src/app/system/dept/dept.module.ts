import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from 'src/app/core/interceptor/custom-http-interceptor';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

/* Inner Component */
import { DeptService } from './dept.service';
import { DeptComponent } from './dept.component';
import { DeptFormComponent } from './dept-form.component';
import { DeptTreeComponent } from './dept-tree.component';
import { DeptSelectComponent } from './dept-select.component';
import { CheckableDeptTreeComponent } from './checkable-dept-tree.component';
import { NzPageHeaderCustomComponent } from 'src/app/shared-component/nz-page-header-custom/nz-page-header-custom.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzDividerModule,
    NzPageHeaderCustomComponent,
    DeptTreeComponent,
    DeptSelectComponent,
    CheckableDeptTreeComponent,
    DeptFormComponent
  ],
  declarations: [
    DeptComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    DeptService
  ],
  exports: [
    DeptComponent,
    DeptSelectComponent,
    CheckableDeptTreeComponent
  ]
})
export class DeptModule { }
