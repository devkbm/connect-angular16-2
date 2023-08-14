import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from 'src/app/core/interceptor/custom-http-interceptor';

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
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';

/* Inner Component */
import { TermComponent } from './term.component';
import { TermService } from './term.service';
import { TermGridComponent } from './term-grid.component';
import { TermFormComponent } from './term-form.component';
import { DataDomainFormComponent } from './data-domain-form.component';
import { WordFormComponent } from './word-form.component';
import { DataDomainGridComponent } from './data-domain-grid.component';
import { WordGridComponent } from './word-grid.component';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzInputSelectComponent } from 'src/app/shared/nz-input-select/nz-input-select.component';
import { NzPageHeaderCustomComponent } from 'src/app/shared/nz-page-header-custom/nz-page-header-custom.component';
import { NzSearchAreaComponent } from 'src/app/shared/nz-search-area/nz-search-area.component';

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
  NzInputNumberModule,
  NzTreeSelectModule,
  NzDatePickerModule,
  NzButtonModule,
  NzPopconfirmModule,
  NzAvatarModule,
  NzDescriptionsModule,
  NzCardModule,
  NzImageModule,
  NzUploadModule,
  NzSpaceModule,
  NzSwitchModule,
  NzIconModule,
  NzBreadCrumbModule,
  NzTabsModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    AgGridModule,
    nzModules,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzCrudButtonGroupComponent,
    NzInputSelectComponent,
    NzPageHeaderCustomComponent,
    NzSearchAreaComponent
  ],
  declarations: [
    TermGridComponent,
    TermFormComponent,
    TermComponent,
    DataDomainFormComponent,
    DataDomainGridComponent,
    WordFormComponent,
    WordGridComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    TermService
  ],
  exports: [
    TermComponent
  ]
})
export class TermModule { }
