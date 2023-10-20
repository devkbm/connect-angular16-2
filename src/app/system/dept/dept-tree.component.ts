import { CommonModule } from '@angular/common';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { Component, OnInit, ViewChild, Output, EventEmitter, Input, inject } from '@angular/core';
import { ResponseList } from 'src/app/core/model/response-list';
import { DeptHierarchy } from './dept-hierarchy.model';

import { DeptService } from './dept.service';

import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';


@Component({
  standalone: true,
  selector: 'app-dept-tree',
  imports: [ CommonModule, NzTreeModule ],
  template: `
    <!--
    <button (click)="getCommonCodeHierarchy()">
        조회
    </button>
    -->
    {{searchValue}}
    <nz-tree
        #treeComponent
        [nzData]="nodeItems"
        [nzSearchValue]="searchValue"
        (nzClick)="nzClick($event)">
    </nz-tree>
  `,
  styles: ['']
})
export class DeptTreeComponent implements OnInit {

  @ViewChild('treeComponent', {static: false}) treeComponent: any;

  nodeItems: DeptHierarchy[] = [];

  @Input()
  searchValue = '';

  @Output()
  itemSelected = new EventEmitter();

  private deptService = inject(DeptService);

  ngOnInit(): void {
    console.log('DeptTreeComponent init');
  }

  public getDeptHierarchy(): void {
    this.deptService
        .getDeptHierarchyList()
        .subscribe(
            (model: ResponseList<DeptHierarchy>) => {
                if ( model.total > 0 ) {
                this.nodeItems = model.data;
                } else {
                this.nodeItems = [];
                }
            }
        );
  }

  nzClick(event: NzFormatEmitEvent): void {
    const node = event.node?.origin;
    this.itemSelected.emit(node);
  }

}
