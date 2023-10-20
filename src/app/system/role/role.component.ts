import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';
import { ResponseObject } from 'src/app/core/model/response-object';

import { RoleGridComponent } from './role-grid.component';
import { RoleService } from './role.service';
import { Role } from './role.model';

import { ButtonTemplate } from 'src/app/shared/nz-buttons/nz-buttons.component';

@Component({
  selector: 'app-authority',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent extends AppBase implements AfterViewInit {

  private service = inject(RoleService);

  @ViewChild(RoleGridComponent) grid!: RoleGridComponent;

  queryOptionList = [
    {label: '롤', value: 'roleCode'},
    {label: '설명', value: 'description'}
  ];
  queryKey = 'authorityCode';
  queryValue = '';

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
      this.drawerAuthority.initLoadId = data.authorityCode;
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
    const id = this.grid.getSelectedRows()[0].authorityCode;

    this.service
        .deleteRole(id)
        .subscribe(
          (model: ResponseObject<Role>) => {
            this.getAuthorityList();
          }
        );
  }

}
