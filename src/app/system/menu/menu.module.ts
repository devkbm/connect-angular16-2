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
import { NzIconModule } from 'ng-zorro-antd/icon';

/* Inner Component */
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { MenuFormComponent } from './menu-form.component';
import { MenuGroupFormComponent } from './menu-group-form.component';
import { MenuGroupGridComponent } from './menu-group-grid.component';
import { MenuGridComponent } from './menu-grid.component';
import { NzPageHeaderCustomComponent } from 'src/app/shared-component/nz-page-header-custom/nz-page-header-custom.component';
import { NzSearchAreaComponent } from 'src/app/shared-component/nz-search-area/nz-search-area.component';
import { NzTreeSelectCustomComponent } from 'src/app/shared-component/nz-tree-select-custom/nz-tree-select-custom.component';
import { MenuRoleTreeComponent } from "./menu-role-tree.component";


@NgModule({
    declarations: [
        MenuComponent
    ],
    providers: [
        { provide: NZ_I18N, useValue: ko_KR },
        { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
        { provide: COMPOSITION_BUFFER_MODE, useValue: false },
        MenuService
    ],
    exports: [
        MenuComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN' }),
        NzFormModule,
        NzSelectModule,
        NzInputModule,
        NzDrawerModule,
        NzDividerModule,
        NzButtonModule,
        NzIconModule,
        NzPageHeaderCustomComponent,
        NzSearchAreaComponent,
        NzTreeSelectCustomComponent,
        MenuGroupGridComponent,
        MenuGroupFormComponent,
        MenuFormComponent,
        MenuGridComponent,
        MenuRoleTreeComponent
    ]
})
export class MenuModule { }
