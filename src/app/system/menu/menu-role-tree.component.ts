import { CommonModule } from '@angular/common';
import { NzTreeModule, NzTreeNode } from 'ng-zorro-antd/tree';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';

import { Component, OnInit, ViewChild, Output, EventEmitter, Input, inject } from '@angular/core';
import { ResponseList } from 'src/app/core/model/response-list';

import { MenuService } from './menu.service';
import { MenuRoleHierarchy } from './menu-role-hierarchy.model';
import { MenuRoleMapping } from './menu-role-mapping.model';


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
    <!--{{nodeItems | json}}-->
    {{saveNodes | json}}
    <button (click)="getDeptHierarchy()">조회</button>
    <button (click)="save()">저장</button>
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

  saveNodes: MenuRoleMapping[] = [];
  saveNodeKeys = new Set<string>();

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

  }

  save() {
    /*
    var saveNodeKeys = new Set<string>();
    let saveNodes: {
      menuGroupCode: string;
      menuCode: string;
      roleCode: string;
    }[] = [];
    */
    this.saveNodeKeys.clear();
    this.saveNodes = [];

    const nodes: NzTreeNode[] = this.treeComponent.getCheckedNodeList();
    for (var node of nodes) {
      const menu_role = node.origin as MenuRoleHierarchy;
      this.saveNodeKeys.add(menu_role.menuGroupCode + menu_role.menuCode + menu_role.roleCode);
      this.saveNodes.push({
        menuGroupCode: menu_role.menuGroupCode,
        menuCode: menu_role.menuCode,
        roleCode: menu_role.roleCode
      });

      if (node.children !== null) {
        for (var childNode of node.children) {
          const child_menu_role = childNode.origin as MenuRoleHierarchy;
          if (!this.saveNodeKeys.has(child_menu_role.menuGroupCode+ child_menu_role.menuCode + child_menu_role.roleCode)) {
            this.saveNodeKeys.add(child_menu_role.menuGroupCode + child_menu_role.menuCode + child_menu_role.roleCode);
            this.saveNodes.push({
              menuGroupCode: child_menu_role.menuGroupCode,
              menuCode: child_menu_role.menuCode,
              roleCode: child_menu_role.roleCode
            });
          }
        }
      }
      //console.log(menu_role.children);
    }

    // 하위 노드 중 일부만 선택(HalfChecked)되어있을 경우 상위 노드도 포함
    const halfCheckedNodes: NzTreeNode[] = this.treeComponent.getHalfCheckedNodeList();
    for (var node of halfCheckedNodes) {
      const menu_role = node.origin as MenuRoleHierarchy;
      if (!this.saveNodeKeys.has(menu_role.menuGroupCode+ menu_role.menuCode + menu_role.roleCode)) {
        this.saveNodeKeys.add(menu_role.menuGroupCode + menu_role.menuCode + menu_role.roleCode);
        this.saveNodes.push({
          menuGroupCode: menu_role.menuGroupCode,
          menuCode: menu_role.menuCode,
          roleCode: menu_role.roleCode
        });
      }
    }
    this.menuService
        .saveMenuRoleMapping(this.saveNodes)
        .subscribe(
          (model: ResponseList<MenuRoleMapping>) => {
            this.getDeptHierarchy();
          }
      );
    console.log(this.saveNodes);
  }

}
