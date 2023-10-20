import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

export interface ButtonTemplate {
  text: string;
  click?(evt: MouseEvent): void;
  nzType?: string;
  isDanger?: boolean;
  popConfirm?: {
    title: string;
    confirmClick(): void;
    cancelClick?(): void;
  }
}

/**
 * example)
  btns: ButtonTemplate[] = [{
    text: 'test',
    click: (e: MouseEvent) => {
      console.log('test');
    },
    nzType: 'save'
  },{
    text: 'test2',
    click: (e: MouseEvent) => {
      console.log('test2');
    },
    nzType: 'delete',
    isDanger: true
  },{
    text: 'test3',
    click: (e: MouseEvent) => {
      console.log('test3');
    },
    isDanger: true,
    popConfirm: {
      title: 'confirm?',
      confirmClick: () => {
        console.log('confirm');
      },
      cancelClick: () => {
        console.log('cancel');
      }
    }
  }];
 */
@Component({
  standalone: true,
  selector: 'app-nz-buttons',
  imports: [CommonModule, NzButtonModule, NzIconModule, NzPopconfirmModule, NzDividerModule],
  template: `
    <div *ngFor="let btn of buttons; let i = index" class="button-group">
      <!-- nz-popconfirm을 사용하지 않을 경우 -->
      <button nz-button *ngIf="btn.text !== '|' && btn.popConfirm === null" [nzDanger]="btn.isDanger" (click)="btn?.click === undefined ? true : btn?.click($event)">
        <span nz-icon [nzType]="btn.nzType" nzTheme="outline" *ngIf="btn.nzType"></span>{{btn.text}}
      </button>

      <!-- nz-popcofirm을 사용할 경우 -->
      <button nz-button *ngIf="btn.text !== '|' && btn.popConfirm !== null" [nzDanger]="btn.isDanger" (click)="btn?.click === undefined ? true : btn?.click($event)"
        nz-popconfirm [nzPopconfirmTitle]="btn.popConfirm?.title" [nzOkType]="btn.isDanger === true ? 'danger' : 'primary'"
        (nzOnConfirm)="btn.popConfirm?.confirmClick === undefined ? true : btn.popConfirm?.confirmClick()"
        (nzOnCancel)="btn.popConfirm?.cancelClick === undefined ? true : btn.popConfirm?.cancelClick()">
        <span nz-icon [nzType]="btn.nzType" nzTheme="outline" *ngIf="btn.nzType"></span>{{btn.text}}
      </button>

      <nz-divider nzType="vertical" *ngIf="btn.text === '|'"></nz-divider>

      <!-- isAutoDevider가 true일 경우 버튼마다 devider 생성 -->
      <nz-divider nzType="vertical" *ngIf="this.isAutoDevider && buttons.length > 0 && i < buttons.length - 1"></nz-divider>
    </div>
  `,
  styles: [`
    .button-group {
      display: inline;
    }
  `]
})
export class NzButtonsComponent implements OnInit {

  @Input() buttons!: ButtonTemplate[];
  @Input() isAutoDevider: boolean = true;

  ngOnInit() {
  }

}
