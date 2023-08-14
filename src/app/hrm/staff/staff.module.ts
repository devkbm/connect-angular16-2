import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzListModule } from 'ng-zorro-antd/list';

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
  NzTabsModule,
  NzInputNumberModule,
  NzTreeSelectModule,
  NzDatePickerModule,
  NzButtonModule,
  NzAvatarModule,
  NzCardModule,
  NzUploadModule,
  NzRadioModule,
  NzIconModule,
  NzCollapseModule,
  NzDescriptionsModule,
  NzListModule
]

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';

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
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzDeptTreeSelectComponent } from 'src/app/shared/nz-dept-tree-select/nz-dept-tree-select.component';
import { NzInputCheckboxComponent } from 'src/app/shared/nz-input-checkbox/nz-input-checkbox.component';
import { NzInputDateComponent } from 'src/app/shared/nz-input-date/nz-input-date.component';
import { NzInputNumberCustomComponent } from 'src/app/shared/nz-input-number-custom/nz-input-number-custom.component';
import { NzInputRadioGroupComponent } from 'src/app/shared/nz-input-radio-group/nz-input-radio-group.component';
import { NzInputRregnoComponent } from 'src/app/shared/nz-input-rregno/nz-input-rregno.component';
import { NzInputSelectComponent } from 'src/app/shared/nz-input-select/nz-input-select.component';
import { NzListRoadAddressComponent } from 'src/app/shared/nz-list-road-address/nz-list-road-address.component';
import { NzPageHeaderCustomComponent } from 'src/app/shared/nz-page-header-custom/nz-page-header-custom.component';
import { NewStaffFormComponent } from './new-staff-form/new-staff-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    nzModules,
    AgGridModule,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzCrudButtonGroupComponent,
    NzDeptTreeSelectComponent,
    NzInputCheckboxComponent,
    NzInputDateComponent,
    NzInputNumberCustomComponent,
    NzInputRadioGroupComponent,
    NzInputRregnoComponent,
    NzInputSelectComponent,
    NzListRoadAddressComponent,
    NzPageHeaderCustomComponent,

    StaffAppointmentRecordGridComponent,
    StaffFamilyGridComponent,
    StaffLicenseGridComponent,
    StaffSchoolCareerGridComponent,
    NewStaffFormComponent,
    StaffAppointmentRecordFormComponent
  ],
  declarations: [
    StaffRegistFormComponent,
    StaffGridComponent,
    StaffCurrentAppointmentDescriptionComponent,
    StaffDutyResponsibilityFormComponent,
    StaffDutyResponsibilityListComponent,
    StaffContactFormComponent,
    StaffManagementComponent,
    StaffFamilyFormComponent,
    StaffLicenseFormComponent,
    StaffSchoolCareerFormComponent,
    StaffCardListComponent,
    StaffCardComponent
  ],
  exports: [
    StaffRegistFormComponent,
    StaffManagementComponent
  ]
})
export class StaffModule { }
