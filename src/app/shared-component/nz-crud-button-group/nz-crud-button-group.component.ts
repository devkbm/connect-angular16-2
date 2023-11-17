import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  standalone: true,
  selector: 'app-nz-crud-button-group',
  imports: [CommonModule, NzButtonModule, NzDividerModule, NzIconModule, NzPopconfirmModule],
  template:`
    <nz-button-group>
      <div *ngIf="searchVisible">
        <button nz-button (click)="searchButtonClick($event)">
          <span nz-icon nzType="search"></span>
          조회
        </button>
        <nz-divider nzType="vertical"></nz-divider>
      </div>

      <div *ngIf="saveVisible">
        <!--저장 재확인할 경우 -->
        <button *ngIf="isSavePopupConfirm" nz-button nzType="primary"
          nz-popconfirm nzPopconfirmTitle="저장하시겠습니까?"
          (nzOnConfirm)="saveButtonClick()" (nzOnCancel)="false">
          <span nz-icon nzType="save" nzTheme="outline"></span>
          저장
        </button>

        <!--저장 재확인하지 않을 경우 -->
        <button *ngIf="!isSavePopupConfirm" nz-button nzType="primary"
          (click)="saveButtonClick()">
          <span nz-icon nzType="save" nzTheme="outline"></span>
          저장
        </button>
        <nz-divider nzType="vertical"></nz-divider>
      </div>

      <div *ngIf="deleteVisible">
        <!--삭제 재확인할 경우 -->
        <button *ngIf="isDeletePopupConfirm" nz-button nzDanger
          nz-popconfirm nzPopconfirmTitle="삭제하시겠습니까?"
          (nzOnConfirm)="deleteButtonClick()" (nzOnCancel)="false">
          <span nz-icon nzType="delete" nzTheme="outline"></span>
          삭제
        </button>
        <!--삭제 재확인하지 않을 경우 -->
        <button *ngIf="!isDeletePopupConfirm" nz-button nzDanger
          (click)="deleteButtonClick()">
          <span nz-icon nzType="delete" nzTheme="outline"></span>
          삭제
        </button>
        <nz-divider nzType="vertical"></nz-divider>
      </div>

      <button nz-button (click)="closeButtonClick($event)">
        <span nz-icon nzType="form" nzTheme="outline"></span>
        닫기
      </button>
    </nz-button-group>
  `,
  styles:[
    `
      .select_button {
        background-color: green;
      }
    `
  ]
})
export class NzCrudButtonGroupComponent implements OnInit {

  @Input() isSavePopupConfirm: boolean = true;
  @Input() isDeletePopupConfirm: boolean = true;

  @Input() searchVisible: boolean = true;
  @Input() saveVisible: boolean = true;
  @Input() deleteVisible: boolean = true;

  @Output() searchClick = new EventEmitter();
  @Output() saveClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  @Output() closeClick = new EventEmitter();

  ngOnInit(): void {
  }

  searchButtonClick(event: any) {
    this.searchClick.emit(event);
  }

  // @HostListener('window:keydown.control.f1', ['$event'])
  @HostListener('window:keydown.alt.s', ['$event'])
  saveHotKeyClick(event: KeyboardEvent) {
    event.preventDefault();
    this.saveClick.emit();
  }

  saveButtonClick() {
    this.saveClick.emit();
  }

  @HostListener('window:keydown.alt.r', ['$event'])
  deleteButtonClick() {
    this.deleteClick.emit();
  }

  @HostListener('window:keydown.alt.q', ['$event'])
  closeButtonClick(event: any) {
    this.closeClick.emit(event);
  }

}
