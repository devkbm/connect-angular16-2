import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { Component, OnInit, Output, EventEmitter, Input, inject } from '@angular/core';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';

import { MenuService } from './menu.service';
import { Menu } from './menu.model';
import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';

@Component({
  standalone: true,
  selector: 'app-menu-grid',
  imports: [
    CommonModule, AgGridModule
  ],
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="menuList"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      (gridReady)="onGridReady($event)"
      (selectionChanged)="selectionChanged($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
  </ag-grid-angular>
  `
})
export class MenuGridComponent extends AggridFunction implements OnInit {

  menuList: Menu[] = [];

  @Output() rowSelected = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Input() menuGroupCode: string = '';

  private menuService = inject(MenuService);
  private appAlarmService = inject(AppAlarmService);

  ngOnInit() {
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
      {headerName: '메뉴그룹코드',  field: 'menuGroupCode',   width: 80 },
      {headerName: '메뉴코드',      field: 'menuCode',        width: 100},
      {headerName: '메뉴명',        field: 'menuName',        width: 150},
      {headerName: '메뉴타입',      field: 'menuType',        width: 100 },
      {headerName: '상위메뉴코드',  field: 'parentMenuCode',  width: 100 },
      {headerName: '순번',          field: 'sequence',        width: 80},
      {headerName: 'APP URL',       field: 'appUrl',          width: 300 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = (data: any) => {
        return data.data.menuGroupCode + data.data.menuCode;
    };
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  getMenuList(params?: any) {

    this.menuService
        .getMenuList(params)
        .subscribe(
          (model: ResponseList<Menu>) => {
              if (model.total > 0) {
                  this.menuList = model.data;
              } else {
                  this.menuList = [];
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
