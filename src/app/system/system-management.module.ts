import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { WebResourceModule } from './webresource/web-resource.module';
import { MenuModule } from './menu/menu.module';
import { HolidayModule } from './holiday/holiday.module';
import { DeptModule } from './dept/dept.module';
import { CommonCodeModule } from './commoncode/common-code.module';
import { TermModule } from './terms/term.module';
import { BizCodeModule } from './biz-code/biz-code.module';
import { SystemManagementRoutingModule } from './system-management-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SystemManagementRoutingModule,
    UserModule,
    RoleModule,
    WebResourceModule,
    MenuModule,
    HolidayModule,
    DeptModule,
    CommonCodeModule,
    TermModule,
    BizCodeModule
  ],
  declarations: [
  ],
  providers: [
  ],
  exports: [
  ]
})
export class SystemManagementModule { }
