import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';
import { ResponseObject } from 'src/app/core/model/response-object';

import { RoleGridComponent } from './role-grid.component';
import { RoleService } from './role.service';
import { Role } from './role.model';

import { ButtonTemplate } from 'src/app/shared-component/nz-buttons/nz-buttons.component';

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

  drawerRole: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  buttons: ButtonTemplate[] = [{
    text: '조회',
    nzType: 'search',
    click: (e: MouseEvent) => {
      this.getRoleList();
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
        this.delete();
      }
    }
  }];


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  openDrawer(): void {
    this.drawerRole.visible = true;
  }

  closeDrawer(): void {
    this.drawerRole.visible = false;
  }

  selectedItem(data: any): void {
    if (data) {
      this.drawerRole.initLoadId = data.authorityCode;
    } else {
      this.drawerRole.initLoadId = null;
    }
  }

  initForm(): void {
    this.drawerRole.initLoadId = null;

    this.openDrawer();
  }

  editDrawOpen(item: any): void {
    this.openDrawer();
  }

  getRoleList(): void {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid?.getList(params);
  }

  delete(): void {
    const id = this.grid.getSelectedRows()[0].authorityCode;

    this.service
        .deleteRole(id)
        .subscribe(
          (model: ResponseObject<Role>) => {
            this.getRoleList();
          }
        );
  }

}
