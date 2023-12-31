import { Component, OnInit } from '@angular/core';

export interface DutyDate {
  date: Date;
  isSelected: boolean;
  isHoliday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
}


@Component({
  selector: 'app-duty-date-list',
  template: `
    {{this._data | json}}
    <div class="container">
      <div *ngFor="let item of _data">
        <label nz-checkbox [(ngModel)]="item.isSelected"> {{item.date | date: 'yyyy-MM-dd'}} </label>
      </div>
    </div>
  `,
  styles: [`
    .container {
      overflow: auto;
      background-color: green;
      height: 100px;
    }
  `]
})
export class DutyDateListComponent implements OnInit {

  _data: DutyDate[] = [{
    date: new Date(),
    isSelected: true,
    isHoliday: false,
    isSaturday: false,
    isSunday: false
  },{
    date: new Date(),
    isSelected: false,
    isHoliday: false,
    isSaturday: false,
    isSunday: false
  },{
    date: new Date(),
    isSelected: false,
    isHoliday: false,
    isSaturday: false,
    isSunday: false
  },{
    date: new Date(),
    isSelected: false,
    isHoliday: false,
    isSaturday: false,
    isSunday: false
  },{
    date: new Date(),
    isSelected: false,
    isHoliday: false,
    isSaturday: false,
    isSunday: false
  }

  ];

  ngOnInit() {
    this._data[0].isSelected
  }

  onChange(a: any) {

  }

}
