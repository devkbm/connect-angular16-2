import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';
import { ResponseObject } from 'src/app/core/model/response-object';

import { WebResourceGridComponent } from './web-resource-grid.component';
import { WebResourceService } from './web-resource.service';
import { WebResource } from './web-resource.model';

import { ButtonTemplate } from 'src/app/shared-component/nz-buttons/nz-buttons.component';

@Component({
  selector: 'app-web-resource',
  templateUrl: './web-resource.component.html',
  styleUrls: ['./web-resource.component.css']
})
export class WebResourceComponent extends AppBase  implements OnInit {

  @ViewChild(WebResourceGridComponent) grid!: WebResourceGridComponent;

  query: { key: string, value: string, list: {label: string, value: string}[] } = {
    key: 'resourceCode',
    value: '',
    list: [
      {label: '리소스코드', value: 'resourceCode'},
      {label: '리소스명', value: 'resourceName'},
      {label: 'URL', value: 'url'},
      {label: '설명', value: 'description'}
    ]
  }

  buttons: ButtonTemplate[] = [{
    text: '조회',
    nzType: 'search',
    click: (e: MouseEvent) => {
      this.getList();
    }
  },{
    text: '신규',
    nzType: 'form',
    click: (e: MouseEvent) => {
      this.newResource();
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

  drawerResource: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  private service = inject(WebResourceService);

  ngOnInit(): void {
  }

  getList(): void {
    let params: any = new Object();
    if ( this.query.value !== '') {
      params[this.query.key] = this.query.value;
    }

    this.drawerResource.visible = false;
    this.grid.getList(params);
  }

  newResource(): void {
    this.drawerResource.initLoadId = null;
    this.drawerResource.visible = true;
  }

  editResource(item: any): void {
    this.drawerResource.initLoadId = item.resourceId;
    this.drawerResource.visible = true;
  }

  delete(): void {
    const id = this.grid.getSelectedRows()[0].resourceId;

    this.service
        .delete(id)
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            this.getList();
          }
        );
  }

  resourceGridRowClicked(item: any): void {
    this.drawerResource.initLoadId = item.resourceId;
  }

}
