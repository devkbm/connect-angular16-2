import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { RoadAddress, RoadAddressJuso, RoadAddressResult } from './road-address.model';
import { RoadAddressService } from './road-address.service';

@Component({
  standalone: true,
  selector: 'app-nz-list-road-address',
  imports: [CommonModule, FormsModule, NzInputModule, NzListModule, NzPaginationModule],
  providers: [NzMessageService],
  template: `
    <div class="container" [style.height]="height">
      <ng-template #suffixIconButton>
        <button nz-button nzType="primary" nzSearch on-click="search()"><span nz-icon nzType="search"></span></button>
      </ng-template>
      <nz-input-group nzSearch [nzAddOnAfter]="suffixIconButton">
        <input [(ngModel)]="searchText" (keyup.enter)="search()" type="text" nz-input placeholder="input search text"/>
      </nz-input-group>

      <nz-list [nzLoading]="_isLoading">
        <nz-list-item *ngFor="let item of _data?.juso" (click)="choice(item)">
          <span nz-typography> {{ item.roadAddr }} </span>
          {{ item.zipNo }}
        </nz-list-item>
      </nz-list>
      <nz-pagination [nzPageIndex]="_page?.index" [nzPageSize]="countPerPage" [nzTotal]="_page?.total" (nzPageIndexChange)="changePageIndex($event)"></nz-pagination>
    </div>
  `,
  styles: [`
    span:hover {
      text-decoration: underline;
    }

    .container {
      overflow: auto;
    }
  `]
})
export class NzListRoadAddressComponent implements OnInit {

  @Input() searchText: string = '';
  @Input() height = '100%';
  @Input() countPerPage: number = 10;
  @Output() itemClicked: EventEmitter<{roadAddress: string, zipNo: string}> = new EventEmitter<{roadAddress: string, zipNo: string}>();

  protected _isLoading: boolean = false;
  protected _data?: RoadAddress;
  protected _page?: {index: number, total: number};

  private service = inject(RoadAddressService);
  private message = inject(NzMessageService);

  ngOnInit() {
  }

  choice(item: RoadAddressJuso) {
    this.itemClicked.emit({roadAddress: item.roadAddr, zipNo: item.zipNo});
  }

  changePageIndex(page: number) {
    if (this._page) {
      this._page.index = page;
    } else {
      this._page = {index: page, total: 0};
    }
    this.search();
  }

  search() {
    let currentPage: number = this._page?.index ?? 1;
    this.getList(this.searchText, currentPage, this.countPerPage);
  }

  getList(keyword: string, currentPage: number, countPerPage: number) {
    if (!keyword) {
      this.message.create('warning', `검색어를 입력해주세요.`);
      return;
    }

    this._isLoading = true;
    this.service
        .get(keyword, currentPage, countPerPage)
        .subscribe(
          (model: RoadAddressResult) => {
            this._data = model.results;
            this._page = {index: this._data.common.currentPage, total: parseInt(this._data.common.totalCount) };
            this._isLoading = false;
          }
        );
  }

}
