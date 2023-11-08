import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';

import { RoleService } from './role.service';
import { Role } from './role.model';
import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';

@Component({
  selector: 'app-authority-grid',
  standalone: true,
  imports: [ CommonModule, AgGridModule, NzSpinModule ],
  template: `
    <nz-spin nzTip="Loading..." [nzSpinning]="isLoading">
      <ag-grid-angular
        [ngStyle]="style"
        class="ag-theme-balham-dark"
        rowSelection="single"
        [rowData]="authorityList"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [getRowId]="getRowId"
        (gridSize)="test($event)"
        (gridReady)="onGridReady($event)"
        (rowClicked)="rowClickedEvent($event)"
        (rowDoubleClicked)="rowDbClicked($event)">
      </ag-grid-angular>
    </nz-spin>
  `,
  styles: [`
    nz-spin {
      height:100%
    }
    /** nz-spin component 하위 엘리먼트 크기 조정 */
    ::ng-deep .ant-spin-container.ng-star-inserted {
      height: 100%;
    }

    /* 헤더 텍스트를 중앙으로 변경 - ::ng-deep대신 다른 방법이 있는지 확인 필요 */
    :host::ng-deep .header-center .ag-cell-label-container { flex-direction: row; justify-content: center; }
    :host::ng-deep .header-center .ag-header-cell-label { flex-direction: row; justify-content: center; }

    /* 헤더 텍스트를 우측으로 변경 - ::ng-deep대신 다른 방법이 있는지 확인 필요 */
    :host::ng-deep .header-right .ag-cell-label-container { flex-direction: row; }
    :host::ng-deep .header-right .ag-header-cell-label { flex-direction: row-reverse; }

  `]
})
export class RoleGridComponent extends AggridFunction implements OnInit {

  isLoading: boolean = false;
  authorityList: Role[] = [];

  @Output() rowClicked = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  private service = inject(RoleService);
  private appAlarmService = inject(AppAlarmService);

  ngOnInit() {
    this.defaultColDef = { resizable: true, sortable: true };

    this.columnDefs = [
        {
          headerName: '',
          sortable: true,
          resizable: true,
          width: 34,
          suppressSizeToFit: true,
          cellStyle: {'text-align': 'center', padding: '0px'},
          cellRenderer: ButtonRendererComponent,
          cellRendererParams: {
            onClick: this.onEditButtonClick.bind(this),
            label: '',
            iconType: 'form'
          }
        },
        {
          headerName: 'No',
          headerClass: 'header-right',
          valueGetter: 'node.rowIndex + 1',
          suppressSizeToFit: true,
          width: 70,
          cellStyle: {'text-align': 'center'}
        },
        {
          headerName: '권한코드',
          headerClass: 'header-center',
          field: 'roleCode',
          suppressSizeToFit: true,
          width: 100
      },
        {
          headerName: '설명',
          field: 'description'
        }
    ];

    this.getRowId = function(params: any) {
      return params.data.roleCode;
    };

    this.getList();
  }

  getList(params?: any): void {
    this.isLoading = true;
    this.service
        .getRoleList(params)
        .subscribe(
          (model: ResponseList<Role>) => {
            if (model.total > 0) {
              this.authorityList = model.data;
              this.sizeToFit();
            } else {
              this.authorityList = [];
            }
            this.isLoading = false;
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  rowClickedEvent(params: any): void {
    this.rowClicked.emit(params.data);
  }

  rowDbClicked(params: any): void {
    this.rowDoubleClicked.emit(params.data);
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public test(event: any): void {
    console.log(event);
  }

}
