import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

/* Shared Component */
import { NzPageHeaderCustomComponent } from 'src/app/shared-component/nz-page-header-custom/nz-page-header-custom.component';

/* Inner Component */
import { StaffRegistFormComponent } from './staff-regist-form.component';
import { StaffAppointmentRecordFormComponent } from './staff-appointment-record/staff-appointment-record-form.component';
import { StaffAppointmentRecordGridComponent } from './staff-appointment-record/staff-appointment-record-grid.component';
import { StaffGridComponent } from './staff-grid.component';
import { StaffManagementComponent } from './staff-management.component';
import { StaffCurrentAppointmentDescriptionComponent } from './staff-current-appointment-description.component';
import { StaffDutyResponsibilityFormComponent } from './staff-duty-responsibility/staff-duty-responsibility-form.component';
import { StaffDutyResponsibilityListComponent } from './staff-duty-responsibility/staff-duty-responsibility-list.component';
import { StaffContactFormComponent } from './staff-contact/staff-contact-form.component';
import { StaffFamilyFormComponent } from './staff-family/staff-family-form.component';
import { StaffFamilyGridComponent } from './staff-family/staff-family-grid.component';
import { StaffLicenseFormComponent } from './staff-license/staff-license-form.component';
import { StaffLicenseGridComponent } from './staff-license/staff-license-grid.component';
import { StaffSchoolCareerFormComponent } from './staff-school-career/staff-school-career-form.component';
import { StaffSchoolCareerGridComponent } from './staff-school-career/staff-school-career-grid.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { StaffCardListComponent } from './staff-card/staff-card-list.component';
import { NewStaffFormComponent } from './new-staff-form/new-staff-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzDrawerModule,
    NzTabsModule,
    NzCollapseModule,
    NzDividerModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,

    NzPageHeaderCustomComponent,

    StaffAppointmentRecordGridComponent,
    StaffFamilyGridComponent,
    StaffLicenseGridComponent,
    StaffSchoolCareerGridComponent,
    NewStaffFormComponent,
    StaffAppointmentRecordFormComponent,
    StaffContactFormComponent,
    StaffDutyResponsibilityFormComponent,
    StaffFamilyFormComponent,
    StaffLicenseFormComponent,
    StaffSchoolCareerFormComponent,
    StaffRegistFormComponent,
    StaffGridComponent,
    StaffCurrentAppointmentDescriptionComponent,
    StaffCardComponent,
    StaffCardListComponent,
    StaffDutyResponsibilityListComponent
  ],
  declarations: [
    StaffManagementComponent
  ],
  exports: [
    StaffManagementComponent
  ]
})
export class StaffModule { }
