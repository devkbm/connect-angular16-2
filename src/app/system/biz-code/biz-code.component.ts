import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';

import { BizCodeTypeGridComponent } from './biz-code-type-grid.component';
import { BizCodeGridComponent } from './biz-code-grid.component';

@Component({
  selector: 'app-biz-code',
  templateUrl: './biz-code.component.html',
  styleUrls: ['./biz-code.component.css']
})
export class BizCodeComponent extends AppBase implements OnInit {

  @ViewChild(BizCodeTypeGridComponent) gridCodeType!: BizCodeTypeGridComponent;
  @ViewChild(BizCodeGridComponent) gridCode!: BizCodeGridComponent;

  drawerCodeType: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerCode: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  ngOnInit(): void {
  }

  selectBizCodeTypeList() {
    this.drawerCodeType.visible = false;

    this.gridCodeType.getList();
  }

  newCodeType() {
    this.drawerCodeType.initLoadId = null;
    this.drawerCodeType.visible = true;
  }

  editCodeType(params: any) {
    this.drawerCodeType.initLoadId = params.typeId;
    this.drawerCodeType.visible = true;
  }

  codeTypeGridRowClicked(params: any) {
    this.drawerCodeType.initLoadId = params.typeId;
    this.drawerCode.initLoadId = {typeId: params.typeId};

    this.gridCode.getList(this.drawerCode.initLoadId.typeId);
  }

  selectBizCodeList() {
    this.drawerCode.visible = false;
    this.gridCode.getList(this.drawerCode.initLoadId.typeId);
  }

  newCode() {
    this.drawerCode.visible = true;
  }

  editCode(params: any) {
    this.drawerCode.initLoadId = {typeId: params.typeId, code: params.code};
    this.drawerCode.visible = true;
  }

  codeGridRowClicked(params: any) {
    this.drawerCode.initLoadId = {typeId: params.typeId, code: params.code};
  }

}
