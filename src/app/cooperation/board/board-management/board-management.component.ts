import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { BoardFormComponent } from './board-form.component';
import { BoardTreeComponent } from '../component/board-tree.component';

@Component({
  selector: 'app-board-management',
  standalone: true,
  imports: [
    CommonModule, NzButtonModule, NzDrawerModule, BoardTreeComponent, BoardFormComponent
  ],
  template: `
    <button nz-button (click)="newBoard()">
      <span nz-icon nzType="form" nzTheme="outline"></span>게시판 등록
    </button>

    <app-board-tree id="boardTree" #boardTree
      [searchValue]="queryValue"
      (itemDbClicked)="modifyBoard($event)">
    </app-board-tree>

    <nz-drawer
      [nzBodyStyle]="{ height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom':'53px' }"
      [nzMaskClosable]="true"
      [nzWidth]="'80%'"
      [nzVisible]="drawerBoard.visible"
      nzTitle="게시판 등록"
      (nzOnClose)="drawerBoard.visible = false">
        <app-board-form #boardForm *nzDrawerContent
          [initLoadId]="this.drawerBoard.initLoadId"
          (formSaved)="getBoardTree()"
          (formDeleted)="getBoardTree()"
          (formClosed)="drawerBoard.visible = false">
        </app-board-form>
    </nz-drawer>
  `,
  styles: [``]

})
export class BoardManagementComponent implements OnInit {

  @ViewChild(BoardTreeComponent) boardTree!: BoardTreeComponent;

  drawerBoard: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  /**
   * 게시판 트리 조회 Filter 조건
   */
  queryValue: any;

  constructor() { }

  ngOnInit() {
  }

  getBoardTree(): void {
    this.drawerBoard.visible = false;
    this.boardTree.getboardHierarchy();
  }

  newBoard(): void {
    this.drawerBoard.initLoadId = null;
    this.drawerBoard.visible = true;
  }

  modifyBoard(item: any): void {
    this.drawerBoard.visible = true;
  }



}
