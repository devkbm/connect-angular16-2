import { Component, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  standalone: true,
  selector: 'app-nz-search-area',
  imports: [NzGridModule],
  template: `
    <div nz-row class="search-area">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .search-area {
      padding: 6px;
      /*background: #fbfbfb;*/
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      padding-left: auto;
      padding-right: 5;
    }
  `]
})
export class NzSearchAreaComponent implements OnInit {

  ngOnInit() {
  }

}
