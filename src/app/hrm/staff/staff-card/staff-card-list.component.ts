import { CommonModule } from '@angular/common';
import { StaffCardComponent } from './staff-card.component';

import { Component, OnInit, inject } from '@angular/core';
import { ResponseList } from 'src/app/core/model/response-list';
import { StaffCardModel } from './staff-card.model';
import { StaffCardService } from './staff-card.service';

@Component({
  selector: 'app-staff-card-list',
  standalone: true,
  imports: [
    CommonModule, StaffCardComponent
  ],
  template: `
    <div *ngFor="let item of _list; trackBy:trackByItem">
      <app-staff-card [data]="item">
      </app-staff-card>
    </div>
  `,
  styles: []
})
export class StaffCardListComponent implements OnInit {
  _list: StaffCardModel[] = [];

  trackByItem = (index: number, item: StaffCardModel): string => item.staffId!;

  private service = inject(StaffCardService);

  ngOnInit() {
    this.getStaffCardList();
  }

  getStaffCardList() {
    this.service
        .getList()
        .subscribe(
          (model: ResponseList<StaffCardModel>) => {
            if (model.total > 0) {
              this._list = model.data;
            } else {
              this._list = [];
            }
          }
        );
  }
}
