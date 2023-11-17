import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MenuBreadCrumb, SessionManager } from 'src/app/core/session-manager';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';

// NzBreadCrumbModule
@Component({
  standalone: true,
  selector: 'app-nz-page-header-custom',
  imports: [CommonModule, NzPageHeaderModule, NzBreadCrumbModule, NzIconModule],
  template: `
   <nz-page-header (nzBack)="goBack()" nzBackIcon [nzTitle]="title" [nzSubtitle]="subtitle">
    <nz-breadcrumb nz-page-header-breadcrumb nzSeparator=">" >
      <nz-breadcrumb-item><a routerLink="/home"><span nz-icon [nzType]="'home'"></span></a></nz-breadcrumb-item>
      <nz-breadcrumb-item *ngFor="let menu of menuBreadCrumb">{{menu.name}}</nz-breadcrumb-item>
    </nz-breadcrumb>
  </nz-page-header>
  `,
  styles: []
})
export class NzPageHeaderCustomComponent implements OnInit {

  menuBreadCrumb: MenuBreadCrumb[] = SessionManager.createBreadCrumb();
  @Input() title: string | TemplateRef<void> = '';
  @Input() subtitle: string | TemplateRef<void> = '';

  protected _location = inject(Location);

  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }

  goFoward() {
    this._location.forward();
  }

}
