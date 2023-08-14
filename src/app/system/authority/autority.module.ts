import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from 'src/app/core/interceptor/custom-http-interceptor';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';

/* Inner Component */
import { AuthorityComponent } from './authority.component';
import { AuthorityService } from './authority.service';
import { AuthorityFormComponent } from './authority-form.component';
import { AuthorityGridComponent } from './authority-grid.component';

/* Shared Component */
import { NzButtonsComponent } from 'src/app/shared/nz-buttons/nz-buttons.component';
import { NzPageHeaderCustomComponent } from 'src/app/shared/nz-page-header-custom/nz-page-header-custom.component';
import { NzSearchAreaComponent } from 'src/app/shared/nz-search-area/nz-search-area.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    /* NG-ZORRO  */
    NzButtonModule,
    NzPopconfirmModule,
    NzGridModule,
    NzSelectModule,
    NzInputModule,
    NzDrawerModule,
    NzDividerModule,
    /* Shared Component */
    NzButtonsComponent,
    NzPageHeaderCustomComponent,
    NzSearchAreaComponent,

    AuthorityGridComponent,
    AuthorityFormComponent
  ],
  declarations: [
    AuthorityComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    AuthorityService
  ],
  exports: [
    AuthorityComponent
  ]
})
export class AutorityModule { }
