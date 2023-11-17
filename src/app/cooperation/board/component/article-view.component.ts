import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzFileUploadComponent } from 'src/app/shared-component/nz-file-upload/nz-file-upload.component';

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Article } from './article.model';

@Component({
  standalone: true,
  selector: 'app-article-view',
  imports: [
    CommonModule, NzPageHeaderModule, NzFileUploadComponent
  ],
  template: `
    <nz-page-header nzTitle="제목" [nzSubtitle]="article?.title">
      <nz-page-header-content>
          {{article?.fromDate}}
      </nz-page-header-content>
    </nz-page-header>

    <div [innerHTML]="article?.contents">
    </div>

    <app-nz-file-upload
      [fileList]="fileList">
    </app-nz-file-upload>
  `,
  styles: [`
    nz-page-header {
      border: 1px solid rgb(235, 237, 240);
    }
  `]
})
export class ArticleViewComponent implements OnInit {

  @Input() article?: Article;

  fileList: any = [];

  ngOnInit() {
    this.fileList = this.article?.fileList ?? [];
  }

}
