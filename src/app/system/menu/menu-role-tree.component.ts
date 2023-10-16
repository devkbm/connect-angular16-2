import { CommonModule } from '@angular/common';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';

import { Component, OnInit, ViewChild, Output, EventEmitter, Input, inject } from '@angular/core';
import { ResponseList } from 'src/app/core/model/response-list';

import { MenuService } from './menu.service';
import { MenuRoleHierarchy } from './menu-role-hierarchy.model';


@Component({
  standalone: true,
  selector: 'app-menu-role-tree',
  imports: [ CommonModule, NzTreeModule ],
  template: `
    <!--
    <button (click)="getCommonCodeHierarchy()">
        조회
    </button>
    -->
    {{searchValue}}
    {{nodeItems | json}}
    <button (click)="getDeptHierarchy()">ddd</button>
    <nz-tree
        #treeComponent
        nzCheckable
        [nzData]="nodeItems"
        [nzSearchValue]="searchValue"
        (nzCheckBoxChange)="nzCheck($event)"
        (nzClick)="nzClick($event)">
    </nz-tree>
  `,
  styles: ['']
})
export class MenuRoleTreeComponent implements OnInit {

  @ViewChild('treeComponent', {static: false}) treeComponent: any;

  nodeItems: MenuRoleHierarchy[] = [];

  @Input() searchValue = '';
  @Output() itemSelected = new EventEmitter();
  private menuService = inject(MenuService);

  constructor() { }

  ngOnInit(): void {
    console.log('DeptTreeComponent init');
  }

  public getDeptHierarchy(): void {
    this.menuService
        .getMenuRoleHierarchy('COM','ROLE_USER')
        .subscribe(
            (model: ResponseList<MenuRoleHierarchy>) => {
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

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(this.treeComponent.getCheckedNodeList());
  }

}
