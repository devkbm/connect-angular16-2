import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';

import { HrmCodeService } from './hrm-code.service';
import { HrmRelationCode } from './hrm-relation-code';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';


@Component({
  standalone: true,
  selector: 'app-hrm-relation-code-grid',
  imports: [CommonModule, AgGridModule],
  template:`
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="gridList"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      (gridReady)="onGridReady($event)"
      (selectionChanged)="selectionChanged($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
    </ag-grid-angular>
  `
})
export class HrmRelationCodeGridComponent extends AggridFunction implements OnInit {

  gridList: HrmRelationCode[] = [];

  @Input()
  appointmentCode: any;

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private hrmCodeService: HrmCodeService) {

    super();

    this.columnDefs = [
      {
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', 'padding': '0px'},
        cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: '',
          iconType: 'form'
        }
      },
      {
        headerName: 'No',
        valueGetter: 'node.rowIndex + 1',
        width: 70,
        cellStyle: {'text-align': 'center'}
      },
      { headerName: '인사연관코드ID',     field: 'relationId',      width: 150 },
      { headerName: '연관코드',           field: 'relCode',         width: 80 },
      { headerName: '연관코드명',         field: 'relCodeName',     width: 80 },
      { headerName: '부모인사유형코드ID', field: 'parentTypeId',    width: 80 },
      { headerName: '부모인사유형코드명', field: 'parentTypeName',    width: 80 },
      { headerName: '부모인사상세코드ID', field: 'parentDetailId',  width: 80 },
      { headerName: '부모인사상세코드명', field: 'parentDetailName',  width: 80 },
      { headerName: '자식인사유형코드ID', field: 'childTypeId',     width: 80 },
      { headerName: '자식인사유형코드명', field: 'childTypeName',     width: 80 },
      { headerName: '자식인사상세코드ID', field: 'childDetailId',   width: 80 },
      { headerName: '자식인사상세코드명', field: 'childDetailName',   width: 80 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(data: any) {
        return data.data.id;
    };
  }

  ngOnInit() {
    this.getGridList('');
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(typeId: string): void {
    const params = {
      relCode : typeId
    };

    this.hrmCodeService
        .getHrmRelationCodeList(params)
        .subscribe(
          (model: ResponseList<HrmRelationCode>) => {
              if (model.total > 0) {
                  this.gridList = model.data;
              } else {
                  this.gridList = [];
              }
              this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  selectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any) {
    this.rowDoubleClicked.emit(event.data);
  }

}
