import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { BoardService } from './component/board.service';

import { BoardTreeComponent } from './component/board-tree.component';
import { BoardFormComponent } from './component/board-form.component';
import { ArticleFormComponent } from './component/article-form.component';
import { BoardComponent } from './board.component';
import { ArticleGridComponent } from './component/article-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { ArticleViewComponent } from './component/article-view.component';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzFileUploadComponent } from 'src/app/shared/nz-file-upload/nz-file-upload.component';
import { NzInputCkeditorComponent } from 'src/app/shared/nz-input-ckeditor/nz-input-ckeditor.component';
import { NzInputSelectComponent } from 'src/app/shared/nz-input-select/nz-input-select.component';
import { NzInputTreeSelectComponent } from 'src/app/shared/nz-input-tree-select/nz-input-tree-select.component';
import { NzMessageService } from 'ng-zorro-antd/message';

const nzModules = [
  NzButtonModule,
  NzPopconfirmModule,
  NzIconModule,
  NzLayoutModule,
  NzGridModule,
  NzFormModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzInputModule,
  NzDrawerModule,
  NzDividerModule,
  NzTreeModule,
  NzTabsModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    nzModules,
    AgGridModule,
    CKEditorModule,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzCrudButtonGroupComponent,
    NzFileUploadComponent,
    NzInputCkeditorComponent,
    NzInputSelectComponent,
    NzInputTreeSelectComponent,

    ArticleGridComponent,
    BoardTreeComponent,
    ArticleViewComponent
  ],
  declarations: [
    BoardFormComponent,
    ArticleFormComponent,
    BoardComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    BoardService,
    NzModalService,
    NzMessageService
  ],
  exports: [
    BoardFormComponent,
    BoardTreeComponent
  ]
})
export class BoardModule { }
