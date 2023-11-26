import { Component, OnInit, ViewChild, inject, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';
import { ResponseList } from 'src/app/core/model/response-list';

import { CommonCodeFormComponent } from './common-code-form.component';
import { CommonCodeTreeComponent } from './common-code-tree.component';
import { CommonCodeService } from './common-code.service';
import { SystemTypeEnum } from './system-type-enum.model';
import { ButtonTemplate } from 'src/app/shared-component/nz-buttons/nz-buttons.component';

@Component({
  selector: 'app-common-code',
  templateUrl: './common-code.component.html',
  styleUrls: ['./common-code.component.css']
})
export class CommonCodeComponent extends AppBase implements OnInit, AfterViewInit {

  @ViewChild(CommonCodeTreeComponent) tree!: CommonCodeTreeComponent;
  @ViewChild(CommonCodeFormComponent) form!: CommonCodeFormComponent;

  systemTypeCodeList: SystemTypeEnum[] = [];

  systeTypeCode = 'COM';
  queryValue = '';
  selectedCode = '';

  buttons: ButtonTemplate[] = [{
    text: '조회',
    nzType: 'search',
    click: (e: MouseEvent) => {
      this.getCommonCodeTree();
    }
  },{
    text: '신규',
    nzType: 'form',
    click: (e: MouseEvent) => {
      this.newForm();
    }
  },{
    text: '저장',
    nzType: 'save',
    popConfirm: {
      title: '저장하시겠습니까?',
      confirmClick: () => {
        this.saveCommonCode();
      }
    }
  },{
    text: '삭제',
    nzType: 'delete',
    isDanger: true,
    popConfirm: {
      title: '삭제하시겠습니까?',
      confirmClick: () => {
        this.deleteCommonCode();
      }
    }
  }];

  private commonCodeService = inject(CommonCodeService);

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getSystemTypeCode();
    this.getCommonCodeTree();
  }

  getCommonCodeTree(): void {
    this.tree.getCommonCodeHierarchy(this.systeTypeCode);
    this.form.getCommonCodeHierarchy(this.systeTypeCode);
    this.selectedCode = '';
  }

  newForm(): void {
    this.form.newForm(this.systeTypeCode, this.selectedCode);
  }

  saveCommonCode(): void {
    this.form.save();
  }

  deleteCommonCode(): void {
    this.form.remove();
  }

  selectedItem(item: any): void {
    this.selectedCode = item.id;
    this.form.get(item.systemTypeCode, item.id);
  }

  getSystemTypeCode(): void {
    this.commonCodeService
      .getSystemTypeList()
      .subscribe(
        (model: ResponseList<SystemTypeEnum>) => {
          this.systemTypeCodeList = model.data;
        }
      );
  }

}
