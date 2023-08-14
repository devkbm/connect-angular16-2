import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AppLayoutService } from './app-layout.service';

import { ResponseList } from 'src/app/core/model/response-list';
import { UserSessionService } from 'src/app/core/service/user-session.service';
import { SelectControlModel } from 'src/app/core/model/select-control.model.ts';
import { MenuHierarchy } from './app-layout.model';
import { NzMenuModeType, NzMenuThemeType } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit  {

  profileAvatarSrc: string = '';

  menuGroupInfo: {list: SelectControlModel[], selectedId: string} = {
    list: [],
    selectedId: ''
  }

  menuInfo: {theme: NzMenuThemeType, mode: NzMenuModeType, inline_indent: number, isCollapsed: boolean, menuItems: MenuHierarchy[]} = {
    theme: 'dark',
    mode: 'inline',
    inline_indent: 12,
    isCollapsed: false,
    menuItems: []
  }
  // 기본 SIDER 메뉴 트리거 숨기기위해 사용
  triggerTemplate: TemplateRef<void> | null = null;

  footerMessage: string = '';

  constructor(private appAlarmService: AppAlarmService,
              private sessionService: UserSessionService,
              private service: AppLayoutService,
              private router: Router) { }

  ngOnInit(): void {
    this.appAlarmService.currentMessage.subscribe(message => this.footerMessage = message);

    this.setInitMenuGroup();
    this.setAvatar();
  }

  /**
   * 초기 메뉴 그룹을 설정한다.
   */
  setInitMenuGroup(): void {
    const stringMenuGroupList = sessionStorage.getItem('menuGroupList') as string;
    const sessionMenuGroup   = sessionStorage.getItem('selectedMenuGroup') as string;

    this.menuGroupInfo.list = JSON.parse(stringMenuGroupList);

    if (sessionMenuGroup) {
      this.menuGroupInfo.selectedId = sessionMenuGroup;
      const LAST_VISIT_URL = sessionStorage.getItem('selectedMenu') as string;
      this.selectMenuGroup(sessionMenuGroup, LAST_VISIT_URL);
    } else {
      this.menuGroupInfo.selectedId = this.menuGroupInfo.list[0].value;
      this.selectMenuGroup(this.menuGroupInfo.list[0].value, null);
    }
  }

  selectMenuGroup(menuGroupId: string, moveUrl: string | null): void {
    sessionStorage.setItem('selectedMenuGroup', menuGroupId);

    this.service
        .getMenuHierarchy(menuGroupId)
        .subscribe(
          (model: ResponseList<MenuHierarchy>) => {
            if ( model.total > 0 ) {
              this.menuInfo.menuItems = model.data;
              sessionStorage.setItem('menuList', JSON.stringify(model.data));
            } else {
              this.menuInfo.menuItems = [];
              sessionStorage.setItem('menuList', '');
            }

            if (moveUrl) {
              this.moveToUrl(moveUrl);
            } else {
              this.moveToMenuGroupUrl(menuGroupId);
            }
          }
        );
  }

  moveToUrl(url: string) {
    sessionStorage.setItem('selectedMenu', url);
    this.router.navigate([url]);
  }

  moveToMenuGroupUrl(menuGroupId: string) {
    type mapType = {
      [key: string]: string;
    }
    const menuGroupUrls: mapType = {
      '001HRM': '/hrm',
      '001GRP': '/grw',
      '001COM': '/system'
    }
    this.moveToUrl(menuGroupUrls[menuGroupId]);
  }

  selectMenu(event: NzFormatEmitEvent): void {
    const node = event.node?.origin as NzTreeNodeOptions;
    sessionStorage.setItem('selectedMenu', node.key);
    this.router.navigate([node['url']]);
  }

  setAvatar(): void {
    // this.profileAvatarSrc = `http://localhost:8090/static/${url}`;

    const profilePictureUrl: string | null = this.sessionService.getAvartarImageString();
    if (profilePictureUrl) {
      this.profileAvatarSrc = profilePictureUrl as string;
    }
  }



}
