import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { HrmCodeTypeGridComponent } from './hrm-code-type-grid.component';
import { HrmCodeGridComponent } from './hrm-code-grid.component';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { HrmCodeService } from './hrm-code.service';
import { ResponseList } from 'src/app/core/model/response-list';
import { HrmCode } from './hrm-code.model';
import { HrmCodeTypeService } from './hrm-code-type.service';
import { HrmType } from './hrm-type.model';

@Component({
  selector: 'app-hrm-code',
  templateUrl: './hrm-code.component.html',
  styleUrls: ['./hrm-code.component.css']
})
export class HrmCodeComponent extends AppBase implements OnInit {

  @ViewChild(HrmCodeTypeGridComponent) gridHrmCodeType!: HrmCodeTypeGridComponent;
  @ViewChild(HrmCodeGridComponent) gridHrmCode!: HrmCodeGridComponent;

  gridHrmCodeTypeList: HrmType[] = [];
  gridHrmCodeList: HrmCode[] = [];

  drawerCodeType: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerCode: { visible: boolean, initLoadId: {typeId: any, code: any} | null } = {
    visible: false,
    initLoadId: null
  }

  private appAlarmService = inject(AppAlarmService);
  private hrmCodeService = inject(HrmCodeService);
  private hrmCodeTypeService = inject(HrmCodeTypeService);

  ngOnInit() {
    this.getGridHrmCodeType();
  }

  getGridHrmCodeType(): void {
    this.drawerCodeType.visible = false;
    this.getGridHrmCodeTypeList('');
  }

  rowClickHrmCodeType(row: any): void {
    this.drawerCodeType.initLoadId = row.typeId;
    this.drawerCode.initLoadId = {typeId: row.typeId, code: ''};

    this.gridHrmCodeGridList(row.typeId);
  }

  newHrmCodeType(): void {
    this.drawerCodeType.initLoadId = null;
    this.drawerCodeType.visible = true;
  }

  editHrmCodeType(row: any): void {
    this.drawerCodeType.initLoadId = row.typeId;
    this.drawerCodeType.visible = true;
  }

  rowClickHrmCode(row: any): void {
    this.drawerCode.initLoadId = {typeId: row.typeId, code: row.code};
  }

  getGridHrmCode(): void {
    this.drawerCode.visible = false;
    this.gridHrmCodeGridList(this.drawerCodeType.initLoadId);
  }

  newHrmCode(): void {
    this.drawerCode.initLoadId = {typeId: this.drawerCodeType.initLoadId, code: null};
    this.drawerCode.visible = true;
  }

  editHrmCode(row: any): void {
    this.drawerCode.initLoadId = {typeId: row.typeId, code: row.code};
    this.drawerCode.visible = true;
  }

  public gridHrmCodeGridList(typeId: string): void {
    const params = {
      typeId : typeId
    };

    this.hrmCodeService
        .getList(params)
        .subscribe(
          (model: ResponseList<HrmCode>) => {
            if (model.total > 0) {
              this.gridHrmCodeList = model.data;
            } else {
              this.gridHrmCodeList = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  getGridHrmCodeTypeList(hrmType: string): void {
    const params = {
      hrmType : hrmType
    };

    this.hrmCodeTypeService
        .getList(params)
        .subscribe(
          (model: ResponseList<HrmType>) => {
            if (model.total > 0) {
              this.gridHrmCodeTypeList = model.data;
            } else {
              this.gridHrmCodeTypeList = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

}
