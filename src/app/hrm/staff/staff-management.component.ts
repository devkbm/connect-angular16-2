import { CommonModule, Location } from '@angular/common';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { Component, OnInit, ViewChild } from '@angular/core';

import { AppBase } from 'src/app/core/app/app-base';
import { StaffRegistFormComponent } from './staff-regist-form.component';
import { StaffGridComponent } from './staff-grid.component';
import { StaffAppointmentRecordGridComponent } from './staff-appointment-record/staff-appointment-record-grid.component';
import { StaffFamilyGridComponent } from './staff-family/staff-family-grid.component';
import { StaffFamily } from './staff-family/staff-family.model';
import { StaffLicense } from './staff-license/staff-license.model';
import { StaffLicenseGridComponent } from './staff-license/staff-license-grid.component';
import { StaffAppointmentRecord } from './staff-appointment-record/staff-appointment-record.model';
import { StaffSchoolCareer } from './staff-school-career/staff-school-career.model';
import { StaffSchoolCareerGridComponent } from './staff-school-career/staff-school-career-grid.component';

@Component({
  selector: 'app-staff-management',
  /*standalone: true,
  imports: [
    CommonModule, NzDrawerModule
  ],*/
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent extends AppBase implements OnInit {

  @ViewChild(StaffGridComponent) gridStaff!: StaffGridComponent;
  @ViewChild(StaffRegistFormComponent) formStaff!: StaffRegistFormComponent;
  @ViewChild(StaffAppointmentRecordGridComponent) gridAppointment!: StaffAppointmentRecordGridComponent;
  @ViewChild(StaffFamilyGridComponent) gridFamily!: StaffFamilyGridComponent;
  @ViewChild(StaffLicenseGridComponent) gridLicense!: StaffLicenseGridComponent;
  @ViewChild(StaffSchoolCareerGridComponent) gridSchoolcareer!: StaffSchoolCareerGridComponent;

  selectedStaff?: {organizationCode: string, staffNo: string, staffName: string};

  drawerNewStaff: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerAppointment: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerDutyResponsibility: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerContact: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerFamily: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerSchoolCareer: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerLicense: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  constructor() {
    super();
  }

  ngOnInit() {
  }

  staffGridRowClicked(params: any) {
    console.log(params);
    this.selectedStaff = {organizationCode: params.organizationCode, staffNo: params.staffNo, staffName: params.name};
    this.formStaff.get(params.staffNo);
  }

  selectGridStaff() {
    this.drawerNewStaff.visible = false;

    this.gridStaff.getList();
  }

  newStaff() {
    this.drawerNewStaff.visible = true;
  }

  newAppoint() {
    this.drawerAppointment.visible = true;
  }

  newDutyResponsibility() {
    this.drawerDutyResponsibility.visible = true;
  }

  newContact() {
    this.drawerContact.visible = true;
  }

  selectGridAppointment() {
    this.drawerAppointment.visible = false;
    this.gridAppointment.getList(this.selectedStaff?.staffNo!);
  }

  editAppointment(row: StaffAppointmentRecord) {
    this.drawerAppointment.initLoadId = {staffId: row.staffNo, seq: row.seq};
    this.drawerAppointment.visible = true;
  }

  selectGridFaimly() {
    this.drawerFamily.visible = false;
    this.gridFamily.getList(this.selectedStaff?.staffNo!);
  }

  newFamily() {
    this.drawerFamily.visible = true;
  }

  editFamily(row: StaffFamily) {
    this.drawerFamily.initLoadId = {staffId: row.staffNo, seq: row.seq};
    this.drawerFamily.visible = true;
  }

  selectGridSchoolCareer() {
    this.drawerSchoolCareer.visible = false;
    this.gridSchoolcareer.getList(this.selectedStaff?.staffNo!);
  }

  newSchoolCareer() {
    this.drawerSchoolCareer.visible = true;
  }

  editSchoolCareer(row: StaffSchoolCareer) {
    this.drawerSchoolCareer.initLoadId = {staffId: row.staffNo, seq: row.seq};
    this.drawerSchoolCareer.visible = true;
  }

  selectGridLicense() {
    this.drawerLicense.visible = false;
    this.gridLicense.getList(this.selectedStaff?.staffNo!);
  }

  newLicense() {
    this.drawerLicense.visible = true;
  }

  editLicense(row: StaffLicense) {
    this.drawerLicense.initLoadId = {staffId: row.staffNo, seq: row.seq};
    this.drawerLicense.visible = true;
  }

}
