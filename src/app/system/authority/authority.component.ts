import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';
import { ResponseObject } from 'src/app/core/model/response-object';

import { AuthorityGridComponent } from './authority-grid.component';
import { AuthorityService } from './authority.service';
import { Authority } from './authority.model';

import { ButtonTemplate } from 'src/app/shared/nz-buttons/nz-buttons.component';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent extends AppBase implements AfterViewInit {

  @ViewChild(AuthorityGridComponent) grid!: AuthorityGridComponent;

  queryKey = 'authority';
  queryValue = '';
  queryOptionList = [
    {label: '권한', value: 'authority'},
    {label: '설명', value: 'description'}
  ];

  drawerAuthority: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  buttons: ButtonTemplate[] = [{
    text: '조회',
    nzType: 'search',
    click: (e: MouseEvent) => {
      this.getAuthorityList();
    }
  },{
    text: '신규',
    nzType: 'form',
    click: (e: MouseEvent) => {
      this.initForm();
    }
  },{
    text: '삭제',
    nzType: 'delete',
    isDanger: true,
    popConfirm: {
      title: '삭제하시겠습니까?',
      confirmClick: () => {
        this.deleteAuthority();
      }
    }
  }];

  constructor(private location: Location,
              private service: AuthorityService) {
    super(location);
    this.appId = "COM002";
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  openDrawer(): void {
    this.drawerAuthority.visible = true;
  }

  closeDrawer(): void {
    this.drawerAuthority.visible = false;
  }

  selectedItem(data: any): void {
    if (data) {
      this.drawerAuthority.initLoadId = data.id;
    } else {
      this.drawerAuthority.initLoadId = null;
    }
  }

  initForm(): void {
    this.drawerAuthority.initLoadId = null;

    this.openDrawer();
  }

  editDrawOpen(item: any): void {
    this.openDrawer();
  }

  getAuthorityList(): void {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid?.getList(params);
  }

  deleteAuthority(): void {
    const id = this.grid.getSelectedRows()[0].authority;

    this.service
        .deleteAuthority(id)
        .subscribe(
          (model: ResponseObject<Authority>) => {
            this.getAuthorityList();
          }
        );
  }

}
