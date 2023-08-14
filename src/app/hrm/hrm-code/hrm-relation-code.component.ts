import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { HrmRelationCodeGridComponent } from './hrm-relation-code-grid.component';
import { HrmRelationCodeFormComponent } from './hrm-relation-code-form.component';

@Component({
  selector: 'app-hrm-relation-code',
  templateUrl: './hrm-relation-code.component.html',
  styleUrls: ['./hrm-relation-code.component.css']
})
export class HrmRelationCodeComponent extends AppBase implements OnInit {

  @ViewChild('gridCode', {static: true}) gridCode!: HrmRelationCodeGridComponent;
  @ViewChild('formCode', {static: true}) formCode!: HrmRelationCodeFormComponent;

  drawerVisible = false;

  queryKey = 'ledgerId';
  queryValue: any;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  public refreshGridHrmType(): void {
    this.closeDrawerHrmType();
    this.gridCode.getGridList('');
  }

  public newHrmTypeForm(): void {
    this.drawerVisible = true;
    this.formCode.newForm();
  }

  editHrmType(row: any): void {
    console.log(row);
    this.formCode.getHrmRelationCode(row.relationId);
    this.drawerVisible = true;
  }

  public closeDrawerHrmType(): void {
    this.drawerVisible = false;
  }

  public selectHrmTypeCode(row: any): void {
    console.log(row);
  }



}
