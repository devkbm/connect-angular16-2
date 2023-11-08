import { Component, OnInit, ViewChild, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AppLayoutService } from './app-layout.service';

import { UserSessionService } from 'src/app/core/service/user-session.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit  {

  profileAvatarSrc: string = '';

  menuGroupInfo: {list: {menuGroupCode: string, menuGroupName: string, menuGroupUrl: string}[], selectedId: string} = {
    list: [],
    selectedId: ''
  }

  // 기본 SIDER 메뉴 트리거 숨기기위해 사용
  triggerTemplate: TemplateRef<void> | null = null;

  footerMessage: string = '';

  sideMenu : {menuGroupCode: string, url: string, isCollapsed: boolean} = {menuGroupCode: '', url: '', isCollapsed: false};

  private appAlarmService = inject(AppAlarmService);
  private sessionService = inject(UserSessionService);
  private service = inject(AppLayoutService);
  private router = inject(Router);

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
    const sessionMenuGroup    = sessionStorage.getItem('selectedMenuGroup') as string;

    this.menuGroupInfo.list = JSON.parse(stringMenuGroupList);

    if (sessionMenuGroup) {
      this.menuGroupInfo.selectedId = sessionMenuGroup;
      this.sideMenu.menuGroupCode = sessionMenuGroup;

      const LAST_VISIT_URL = sessionStorage.getItem('selectedMenu') as string;
      this.moveToUrl(LAST_VISIT_URL);

    } else {
      this.menuGroupInfo.selectedId = this.menuGroupInfo.list[0].menuGroupCode;
      this.moveToMenuGroupUrl(this.menuGroupInfo.selectedId);
    }
  }

  moveToMenuGroupUrl(menuGroupCode: string) {
    sessionStorage.setItem('selectedMenuGroup', menuGroupCode);

    this.sideMenu.menuGroupCode = menuGroupCode;

    for (const menuGroup of this.menuGroupInfo.list) {
      if (menuGroup.menuGroupCode === menuGroupCode) {
        // MenuGroup Default Url
        this.moveToUrl(menuGroup.menuGroupUrl);
      }
    }
  }

  moveToUrl(url: string) {
    this.sideMenu.url = url;
  }

  setAvatar(): void {
    const profilePictureUrl: string | null = this.sessionService.getAvartarImageString();
    if (profilePictureUrl) {
      this.profileAvatarSrc = profilePictureUrl as string;
    }
  }

}
