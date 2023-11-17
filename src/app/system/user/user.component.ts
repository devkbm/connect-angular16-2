import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';
import { ResponseObject } from 'src/app/core/model/response-object';

import { UserGridComponent } from './user-grid.component';
import { UserService } from './user.service';
import { User } from './user.model';

import { ButtonTemplate } from 'src/app/shared-component/nz-buttons/nz-buttons.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends AppBase implements OnInit {

  @ViewChild(UserGridComponent) grid!: UserGridComponent;

  buttons: ButtonTemplate[] = [{
    text: '구글 로그인',
    nzType: 'search',
    click: (e: MouseEvent) => {
      this.test();
    }
  },{
    text: '조회',
    nzType: 'search',
    click: (e: MouseEvent) => {
      this.getUserList();
    }
  },{
    text: '신규',
    nzType: 'form',
    click: (e: MouseEvent) => {
      this.newForm();
    }
  },{
    text: '삭제',
    nzType: 'delete',
    isDanger: true,
    popConfirm: {
      title: '삭제하시겠습니까?',
      confirmClick: () => {
        this.deleteUser();
      }
    }
  }];

  query: { key: string, value: string, list: {label: string, value: string}[] } = {
    key: 'userId',
    value: '',
    list: [
      {label: '아이디', value: 'userId'},
      {label: '성명', value: 'name'}
    ]
  }

  drawerUser: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  private service = inject(UserService);

  ngOnInit() {
  }

  newForm() {
    this.drawerUser.initLoadId = null;
    this.drawerUser.visible = true;

  }

  editForm(item: User) {
    console.log(item.userId);
    this.drawerUser.initLoadId = item.userId;
    this.drawerUser.visible = true;
  }

  getUserList() {
    let params: any = new Object();
    if ( this.query.value !== '') {
      params[this.query.key] = this.query.value;
    }

    this.drawerUser.visible = false;
    this.grid.getUserList(params);
  }

  deleteUser() {
    const userId: string = this.grid.getSelectedRow().userId;
    this.service
        .deleteUser(userId)
        .subscribe(
          (model: ResponseObject<User>) => {
            this.getUserList();
          }
        );
  }

  userGridSelected(params: any) {
    this.drawerUser.initLoadId = params.userId;
  }

  test() {
    window.location.href = 'http://localhost:8090/oauth2/authorization/google';
  }
}
