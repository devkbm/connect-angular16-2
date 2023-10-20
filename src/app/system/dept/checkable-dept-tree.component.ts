import { CommonModule } from '@angular/common';

import { Component, OnInit, ViewChild, Output, EventEmitter, Input, inject } from '@angular/core';
import { ResponseList } from 'src/app/core/model/response-list';
import { DeptHierarchy } from './dept-hierarchy.model';

import { DeptService } from './dept.service';

import { NzFormatEmitEvent, NzTreeComponent, NzTreeModule } from 'ng-zorro-antd/tree';


@Component({
  standalone: true,
  selector: 'app-checkable-dept-tree',
  imports: [
    CommonModule, NzTreeModule
  ],
  template: `
    {{defaultCheckedKeys}}
    <nz-tree
        #treeComponent
        nzCheckable
        [nzData]="nodeItems"
        [nzCheckedKeys]="defaultCheckedKeys"
        [nzSearchValue]="searchValue"
        (nzCheckBoxChange)="nzCheck($event)"
        (nzClick)="nzClick($event)">
    </nz-tree>
  `,
  styles: ['']
})
export class CheckableDeptTreeComponent implements OnInit {

    @ViewChild('treeComponent', {static: false}) treeComponent!: NzTreeComponent;

    nodeItems: DeptHierarchy[] = [];
    defaultCheckedKeys: any = [''];

    @Input()
    searchValue = '';

    @Output() itemSelected = new EventEmitter();
    @Output() itemChecked = new EventEmitter();

    private deptService = inject(DeptService);

    ngOnInit(): void {
        console.log('CheckableDeptTreeComponent init');
    }

    public getDeptHierarchy(): void {
        this.deptService
            .getDeptHierarchyList()
            .subscribe(
                (model: ResponseList<DeptHierarchy>) => {
                    if ( model.total > 0 ) {
                    this.nodeItems = model.data;
                    } else {
                    this.nodeItems = [];
                    }
                },
                (err) => {
                console.log(err);
                },
                () => {
                console.log('완료');
                }
            );
    }

    nzClick(event: NzFormatEmitEvent): void {
        const node = event.node?.origin;
        this.itemSelected.emit(node);
    }

    nzCheck(event: NzFormatEmitEvent): void {
        console.log(event);
        this.defaultCheckedKeys = event.keys;
        this.itemChecked.emit(event.keys);
      }

}
