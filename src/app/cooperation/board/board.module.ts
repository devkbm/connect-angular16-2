import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';

/* Inner Compononet */
import { BoardTreeComponent } from './component/board-tree.component';
import { BoardFormComponent } from './board-management/board-form.component';
import { ArticleFormComponent } from './component/article-form.component';
import { BoardComponent } from './board.component';
import { ArticleGridComponent } from './component/article-grid.component';
import { ArticleViewComponent } from './component/article-view.component';

import { BoardService } from './component/board.service';
import { BoardManagementComponent } from './board-management/board-management.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzButtonModule,
    NzDrawerModule,
    NzTabsModule,
    NzInputModule,
    NzGridModule,
    NzTreeModule,
    NzDividerModule,
    NzIconModule,

    ArticleGridComponent,
    BoardTreeComponent,
    ArticleViewComponent,
    ArticleFormComponent,
    BoardFormComponent,
    BoardManagementComponent
  ],
  declarations: [
    BoardComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    BoardService,
    NzModalService,
    NzMessageService
  ],
  exports: [
    BoardTreeComponent
  ]
})
export class BoardModule { }
