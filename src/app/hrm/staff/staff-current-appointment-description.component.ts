import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ResponseObject } from 'src/app/core/model/response-object';
import { StaffService } from './staff.service';
import { CommonModule } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

export interface StaffCurrentAppointment {
	organizationCode: string;
	staffNo: string;
	blngDeptId: string;
	blngDeptName: string;
	workDeptId: string;
	workDeptName: string;
	jobGroupCode: string;
	jobGroupName: string;
	jobPositionCode: string;
	jobPositionName: string;
	occupationCode: string;
	occupationName: string;
	jobGradeCode: string;
	jobGradeName: string;
	payStepCode: string;
	payStepName: string;
	jobCode: string;
	jobName: string;
}

@Component({
  selector: 'app-staff-current-appointment-description',
  standalone: true,
  imports: [
    CommonModule, NzDescriptionsModule
  ],
  template: `
    <nz-descriptions>
      <nz-descriptions-item nzTitle="소속부서">{{info?.blngDeptName}}</nz-descriptions-item>
      <nz-descriptions-item nzTitle="근무부서">{{info?.workDeptName}}</nz-descriptions-item>
      <nz-descriptions-item nzTitle="직군">{{info?.jobGroupName}}</nz-descriptions-item>
      <nz-descriptions-item nzTitle="직위">{{info?.jobPositionName}}</nz-descriptions-item>
      <nz-descriptions-item nzTitle="직급">{{info?.jobGroupName}}</nz-descriptions-item>
      <nz-descriptions-item nzTitle="호봉">{{info?.payStepName}}</nz-descriptions-item>
      <nz-descriptions-item nzTitle="직무">{{info?.jobName}}</nz-descriptions-item>
    </nz-descriptions>
  `,
  styles: []
})
export class StaffCurrentAppointmentDescriptionComponent implements OnInit, OnChanges {

  @Input() staffNo?: string;

  info?: StaffCurrentAppointment;

  private service = inject(StaffService);

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['staffNo']) {
      this.get(changes['staffNo'].currentValue);
    }
  }

  get(staffNo: string): void {
    if (staffNo) {
      this.service
        .getCurrentAppointment(staffNo)
        .subscribe(
          (model: ResponseObject<StaffCurrentAppointment>) => {
            if ( model.total > 0 ) {
              this.info = model.data;
            }
          }
      );
    }
  }
}
