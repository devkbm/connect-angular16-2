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
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';

/* Inner Component */
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form.component';
import { UserGridComponent } from './user-grid.component';
import { UserPopupComponent } from './user-popup.component';
import { UserImageUploadComponent } from './user-image-upload.component';
import { UserService } from './user.service';
import { UserProfileComponent } from './user-profile.component';
import { NzPageHeaderCustomComponent } from 'src/app/shared-component/nz-page-header-custom/nz-page-header-custom.component';
import { NzSearchAreaComponent } from 'src/app/shared-component/nz-search-area/nz-search-area.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
    NzIconModule,
    NzDrawerModule,
    NzDividerModule,
    NzButtonModule,
    NzPageHeaderCustomComponent,
    NzSearchAreaComponent,

    UserPopupComponent,
    UserGridComponent,
    UserImageUploadComponent,
    UserFormComponent,
    UserProfileComponent
  ],
  declarations: [
    UserComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    UserService
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
