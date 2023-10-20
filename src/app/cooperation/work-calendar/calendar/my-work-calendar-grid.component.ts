import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { AggridFunction } from '../../../core/grid/aggrid-function';
import { ResponseList } from '../../../core/model/response-list';
import { AppAlarmService } from '../../../core/service/app-alarm.service';

import { WorkCalendarService } from './work-calendar.service';
import { WorkCalendar } from './work-calendar.model';


@Component({
  selector: 'app-my-work-calendar-grid',
  standalone: true,
  imports: [
    CommonModule, AgGridModule
  ],
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'multiple'"
      [rowData]="workGroupList"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      (gridReady)="onGridReady($event)"
      (selectionChanged)="selectionChanged($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
    </ag-grid-angular>
  `
})
export class MyWorkCalendarGridComponent extends AggridFunction implements OnInit {

  workGroupList: WorkCalendar[] = [];

  @Output() rowSelected = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  private appAlarmService = inject(AppAlarmService);
  private workGroupService = inject(WorkCalendarService);

  ngOnInit(): void {
    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.columnDefs = [
      {
          headerName: 'No',
          valueGetter: 'node.rowIndex + 1',
          width: 40,
          cellStyle: {'text-align': 'center'},
          suppressSizeToFit: true,
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true
      },
      {
          headerName: 'Id',
          field: 'id',
          width: 40,
          suppressSizeToFit: true,
          hide: true
      },
      {
        headerName: '',
        width: 10,
        suppressSizeToFit: true,
        cellStyle: (params: any) => {
          return {backgroundColor: params.data.color};
        }
      },
      {
        headerName: '작업그룹명',
        field: 'name',
        width: 140
      }
    ];

    this.getRowId = (data: any) => {
        return data.data.id;
    };

    this.sizeToFit();
  }

  getMyWorkGroupList(): void {
    this.workGroupService
        .getMyWorkGroupList()
        .subscribe(
          (model: ResponseList<WorkCalendar>) => {
              if (model.total > 0) {
                  this.workGroupList = model.data;
              } else {
                  this.workGroupList = [];
              }
              this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  selectionChanged(event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();
    let ids = selectedRows.map((v: { id: any; }) => v.id)   // id 추출
                          .join(',');       // 콤마 구분자로 분리함
    this.rowSelected.emit(ids);
    // console.log('ids ' + ids);
  }

  rowDbClicked(event: any): void {
    this.rowDoubleClicked.emit(event.data);
  }

}
