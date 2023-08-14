import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ResponseList } from 'src/app/core/model/response-list';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { StaffService } from './staff.service';
import { Staff } from './staff.model';

@Component({
  selector: 'app-staff-grid',
  template: `
   <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="list"
      [columnDefs]="columnDefs"
      [getRowId]="getRowId"
      [defaultColDef]="defaultColDef"
      (gridReady)="onGridReady($event)"
      (rowClicked)="rowClickedFunc($event)"
      (rowDoubleClicked)="rowDbClickedFunc($event)">
  </ag-grid-angular>
  `,
  styles: []
})
export class StaffGridComponent extends AggridFunction implements OnInit {

  list: Staff[] = [];

  @Output() rowClickedEvent = new EventEmitter();
  @Output() rowDoubleClickedEvent = new EventEmitter();
  @Output() editButtonClickedEvent = new EventEmitter();

  constructor(private service: StaffService,
              private appAlarmService: AppAlarmService) {

    super();

    this.defaultColDef = { resizable: true, sortable: true };

    this.columnDefs = [
      /*{
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', padding: '0px'},
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: '',
          iconType: 'form'
        }
      },*/
      {
        headerName: '',
        valueGetter: 'node.rowIndex + 1',
        width: 38,
        cellStyle: {'text-align': 'center'}
      },
      {headerName: '직원번호',      field: 'staffNo',         width: 77},
      {headerName: '직원명',        field: 'name',            width: 75 }
      /*{headerName: '생년월일',      field: 'birthday',        width: 200 } */
    ];

    this.getRowId = function(params: any) {
      return params.data.organizationCode + params.data.staffNo;
    };
  }

  ngOnInit() {
    this.getList();
  }

  private onEditButtonClick(e: any) {
    this.editButtonClickedEvent.emit(e.rowData);
  }

  getList(params?: any): void {
    this.service
        .getStaffList(params)
        .subscribe(
          (model: ResponseList<Staff>) => {
            if (model.total > 0) {
              this.list = model.data;
            } else {
              this.list = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  rowClickedFunc(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowClickedEvent.emit(selectedRows[0]);
  }

  rowDbClickedFunc(event: any) {
    this.rowDoubleClickedEvent.emit(event.data);
  }

}
