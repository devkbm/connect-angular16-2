import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';

import { MenuGroupGridComponent } from './menu-group-grid.component';
import { MenuGridComponent } from './menu-grid.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends AppBase implements OnInit {

  @ViewChild(MenuGroupGridComponent) gridMenuGroup!: MenuGroupGridComponent;
  @ViewChild(MenuGridComponent) gridMenu!: MenuGridComponent;

  queryMenuGroup: { key: string, value: string, list: {label: string, value: string}[] } = {
    key: 'menuGroupId',
    value: '',
    list: [
      {label: '메뉴그룹ID', value: 'menuGroupCode'},
      {label: '메뉴그룹명', value: 'menuGroupName'}
    ]
  }

  queryMenu: { key: string, value: string, list: {label: string, value: string}[] } = {
    key: 'menuId',
    value: '',
    list: [
      {label: '메뉴ID', value: 'menuCode'},
      {label: '메뉴명', value: 'menuName'}
    ]
  }

  drawerMenuGroup: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerMenu: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  ngOnInit() {
  }

  //#region 메뉴그룹
  getMenuGroupList(): void {
    let params: any = new Object();
    if ( this.queryMenuGroup.value !== '') {
      params[this.queryMenuGroup.key] = this.queryMenuGroup.value;
    }

    this.drawerMenuGroup.visible = false;
    this.gridMenu.clearData();
    this.gridMenuGroup.getMenuGroupList(params);
  }

  newMenuGroup(): void {
    this.drawerMenuGroup.initLoadId = null;
    this.drawerMenuGroup.visible = true;
  }

  editMenuGroup(item: any) {
    this.drawerMenuGroup.initLoadId = item.menuGroupCode;
    this.drawerMenuGroup.visible = true;
  }

  menuGroupGridRowClicked(row: any): void {
    this.drawerMenuGroup.initLoadId = row.menuGroupCode;
    this.getMenuList();
  }
  //#endregion 메뉴그룹

  //#region 메뉴
  getMenuList(): void {
    let params: any = new Object();
    params['menuGroupCode'] = this.drawerMenuGroup.initLoadId;

    if ( this.queryMenu.value !== '') {
      params[this.queryMenu.key] = this.queryMenu.value;
    }

    this.drawerMenu.visible = false;
    this.gridMenu.getMenuList(params);
  }

  newMenu(): void {
    this.drawerMenu.initLoadId = null;
    this.drawerMenu.visible = true;
  }

  editMenu(item: any) {
    this.drawerMenu.initLoadId = {menuGroupCode: item.menuGroupCode, menuCode: item.menuCode};
    this.drawerMenu.visible = true;
  }

  menuGridRowClicked(row: any): void {
    this.drawerMenu.initLoadId =  {menuGroupCode: row.menuGroupCode, menuCode: row.menuCode};
  }
  //#endregion 메뉴

}
