import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuTrigger } from '@angular/material/menu';
import { ContextMenuComponent, ContextMenuModule, ContextMenuService } from '@perfectmemory/ngx-contextmenu';

import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { TodoGroupModel } from './todo-group.model';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  selector: 'app-todo-group-list',
  imports: [ CommonModule, MatListModule, MatButtonModule, ContextMenuModule ],
  template: `

    <button mat-raised-button color="primary" (click)="addTodoGroup()" style="width:100%">그룹 추가</button>
    <mat-selection-list #todoGroups [multiple]="false"  color="primary"
                        (selectionChange)="selectTodoGroup(todoGroups.selectedOptions.selected[0].value)">
      <!--<mat-list-option *ngFor="let todoGroup of todoGroupList; index as i" [value]="todoGroup.pkTodoGroup" (contextmenu)="onContextMenu($event, todoGroup)">-->
      <mat-list-option *ngFor="let todoGroup of todoGroupList; trackBy: trackByItem; " [value]="todoGroup.pkTodoGroup" [contextMenu]="basicMenu" [contextMenuValue]="todoGroup">
        {{todoGroup.todoGroupName}}
      </mat-list-option>
    </mat-selection-list>

    <context-menu menuClass="custom-style">
      <ng-template contextMenuItem let-item="item" [passive]="true"
        (execute)="showMessage('Hi, someone', $event.value.pkTodoGroup)">
        <input #rename value="{{item.todoGroupName}}" (keydown.enter)="renameTodoGroup(item, rename.value)"/>
        <button (click)="renameTodoGroup(item, rename.value)">변경</button>
      </ng-template>

      <ng-template contextMenuItem let-item (execute)="onContextMenuAction2($event.value)">
      그룹 삭제
      </ng-template>
    </context-menu>

    <!--
      input 텍스트박스가 사라져서 다른 방법을 찾고 있음

    <div style="visibility: hidden; position: fixed"
        [style.left]="contextMenuPosition.x"
        [style.top]="contextMenuPosition.y"
        [matMenuTriggerFor]="contextMenu">
    </div>
    <mat-menu #contextMenu="matMenu">
      <ng-template matMenuContent let-item="item" contextMenuItem="true">
        <div>
          <input value="{{item.pkTodoGroup}}"/><button mat-menu-item (click)="onContextMenuAction1(item)">Action 1</button>
        </div>
        <button mat-menu-item (click)="onContextMenuAction2(item)">그룹 삭제</button>
      </ng-template>
    </mat-menu>
    -->
  `,
  styles: [`
    .custom-style {
      /* Styling of the element where a context menu can appear */
      --ngx-contextmenu-focusable-border-bottom: 1px dotted #70757e;

      /* Styling of the context menu itself */
      --ngx-contextmenu-font-family: sans-serif;
      --ngx-contextmenu-background-color: white;
      --ngx-contextmenu-border-radius: 4px;
      --ngx-contextmenu-border: 1px solid rgba(0, 0, 0, 0.18);
      --ngx-contextmenu-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.18);
      --ngx-contextmenu-font-size: 14px;
      --ngx-contextmenu-margin: 2px 0 0;
      --ngx-contextmenu-min-width: 160px;
      --ngx-contextmenu-outline: 1px solid #70757e;
      --ngx-contextmenu-padding: 5px 0;
      --ngx-contextmenu-text-color: #70757e;
      --ngx-contextmenu-text-disabled-color: #8a909a;
      --ngx-contextmenu-max-height: 100vh;

      /* Styling of context menu items */
      --ngx-contextmenu-item-arrow-left: '◀';
      --ngx-contextmenu-item-arrow-right: '▶';
      --ngx-contextmenu-item-background-hover-color: #f8f8f8;
      --ngx-contextmenu-item-separator-color: #8a909a;
      --ngx-contextmenu-item-separator-padding: 10px;
      --ngx-contextmenu-item-separator-width: 96%;
      --ngx-contextmenu-item-padding: 6px 20px;
      --ngx-contextmenu-item-text-hover-color: #5a6473;
    }
  `]
})
export class TodoGroupListComponent implements OnInit {

  @Output() onSelectedTodoGroup = new EventEmitter<string>();
  @Output() onDeletedTodoGroup = new EventEmitter<string>();

  todoGroupList: TodoGroupModel[] = [];
  trackByItem = (index: number, item: TodoGroupModel) => item.pkTodoGroup;


  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  // https://perfectmemory.github.io/ngx-contextmenu/?path=/docs/context-menu-introduction--docs
  @ViewChild(ContextMenuComponent) public basicMenu!: ContextMenuComponent<any>;

  constructor(private service: TodoService,  private _contextMenuService: ContextMenuService<any>) { }

  ngOnInit() {
    this.getTodoGroupList();
  }

  addTodoGroup(): void {
    this.service
        .newTodoGroup()
        .subscribe(
          (model: ResponseObject<TodoGroupModel>) => {
            if (model === null || model === undefined) return;

            this.todoGroupList.push(model.data);
            this.onSelectedTodoGroup.emit(model.data.pkTodoGroup);
          }
        );
  }

  getTodoGroupList(): void {
    this.service
        .getMyTodoGroupList()
        .subscribe(
          (model: ResponseList<TodoGroupModel>) => {
            if (model === null || model === undefined) return;
            console.log(model);
            this.todoGroupList = model.data;
          }
        );
  }

  selectTodoGroup(pkTodoGroup: string): void {
    this.onSelectedTodoGroup.emit(pkTodoGroup);
  }

  deleteTodoGroup(pkTodoGroup: string): void {
    this.onDeletedTodoGroup.emit(pkTodoGroup);
  }

  onContextMenu(event: MouseEvent, item: TodoGroupModel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuAction1(item: TodoGroupModel) {
    alert(`Click on Action 1 for ${item.pkTodoGroup}`);
  }

  onContextMenuAction2(item: TodoGroupModel) {
    let index = this.todoGroupList.findIndex((e) => e.pkTodoGroup === item.pkTodoGroup);
    this.todoGroupList.splice(index, 1);

    this.deleteTodoGroup(item.pkTodoGroup);
    //alert(`Click on Action 2 for ${item.pkTodoGroup}`);
  }

  public showMessage(message: any, data?: any): void {
    console.log(message, data);
  }

  renameTodoGroup(item: TodoGroupModel, name: string) {
    item.todoGroupName = name;

    this.service
        .saveTodoGroup({pkTodoGroup: item.pkTodoGroup, todoGroupName: name})
        .subscribe(
          (model: ResponseObject<TodoGroupModel>) => {

          }
        );

    this._contextMenuService.closeAll();
  }
}
