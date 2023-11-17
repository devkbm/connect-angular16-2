import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from 'src/app/core/interceptor/custom-http-interceptor';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';

/* Inner Component */
import { CommonCodeService } from './common-code.service';
import { CommonCodeComponent } from './common-code.component';
import { CommonCodeFormComponent } from './common-code-form.component';
import { CommonCodeGridComponent } from './common-code-grid.component';
import { CommonCodeTreeComponent } from './common-code-tree.component';
import { NzButtonsComponent } from 'src/app/shared-component/nz-buttons/nz-buttons.component';
import { NzPageHeaderCustomComponent } from 'src/app/shared-component/nz-page-header-custom/nz-page-header-custom.component';
import { NzSearchAreaComponent } from 'src/app/shared-component/nz-search-area/nz-search-area.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzButtonsComponent,
    NzPageHeaderCustomComponent,
    NzSearchAreaComponent,

    CommonCodeTreeComponent,
    CommonCodeGridComponent,
    CommonCodeFormComponent
  ],
  declarations: [
    CommonCodeComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    CommonCodeService
  ],
  exports: [
    CommonCodeComponent,
    CommonCodeTreeComponent
  ]
})
export class CommonCodeModule { }
