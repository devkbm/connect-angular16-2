import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzMenuModeType, NzMenuThemeType } from 'ng-zorro-antd/menu';
import { MenuHierarchy } from '../app-layout.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  menuInfo: {theme: NzMenuThemeType, mode: NzMenuModeType, inline_indent: number, isCollapsed: boolean, menuItems: MenuHierarchy[]} = {
    theme: 'dark',
    mode: 'inline',
    inline_indent: 12,
    isCollapsed: false,
    menuItems: []
  }
  // 기본 SIDER 메뉴 트리거 숨기기위해 사용
  triggerTemplate: TemplateRef<void> | null = null;

  private router = inject(Router);

  ngOnInit() {
  }

  moveToUrl(url: string) {
    sessionStorage.setItem('selectedMenu', url);
    this.router.navigate([url]);
  }

}
