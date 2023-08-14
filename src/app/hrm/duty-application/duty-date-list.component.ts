import { Component, Input, OnInit } from '@angular/core';
import { DutyDate } from './duty-application.model';

@Component({
  selector: 'app-duty-date-list',
  template: `
    <div class="container" [style.height]="height">
      <div *ngFor="let item of data">
        <label nz-checkbox [(ngModel)]="item.isSelected" [ngStyle]="{'color': getFontColor(item)}">
          {{item.date | date: 'yyyy-MM-dd'}}
        </label>
      </div>
    </div>
  `,
  styles: [`
    .container {
      overflow: auto;
    }
  `]
})
export class DutyDateListComponent implements OnInit {

  @Input() height = '100%';
  @Input() data: DutyDate[] = [];

  fontColor: string = 'black';

  constructor() { }

  ngOnInit() {
  }

  getFontColor(item: DutyDate) {
    let fontColor = 'white';

    if (item.isHoliday || item.isSunday) fontColor = 'red';   // RED SERIES
    if (item.isSaturday) fontColor = '#6495ED';               // BLUE SERIES

    return fontColor;
  }


}
