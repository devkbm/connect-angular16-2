import { AfterViewInit, Component, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { ArticleGridComponent } from './component/article-grid.component';
import { BoardTreeComponent } from './component/board-tree.component';
import { Article } from './component/article.model';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface TabArticle {
  tabName: string;
  articleId: number;
  article: Article;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements AfterViewInit {

  @ViewChild(BoardTreeComponent) boardTree!: BoardTreeComponent;
  @ViewChild(ArticleGridComponent) articleGrid!: ArticleGridComponent;

  drawerBoard: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerArticle: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerArticleView: { visible: boolean, article: any} = {
    visible: false,
    article: null
  }

  tabIndex: number = 0;
  tabs: TabArticle[] = [];
  tabTitle: any;

  /**
   * 게시판 트리 조회 Filter 조건
   */
  queryValue: any;

  private message = inject(NzMessageService);
  public viewContainerRef = inject(ViewContainerRef);

  ngAfterViewInit(): void {
    this.getBoardTree();
  }

  setBoardSelect(item: any): void {
    this.tabTitle = item.title;
    this.drawerBoard.initLoadId = item.key;

    this.getArticleGridData();
  }

  getArticleGridData(): void {
    this.drawerArticle.visible = false;
    this.drawerArticleView.visible = false;

    this.articleGrid.getArticleList(this.drawerBoard.initLoadId);
  }

  getBoardTree(): void {
    this.drawerBoard.visible = false;
    this.boardTree.getboardHierarchy();
  }

  newArticle(): void {
    if (this.drawerBoard.initLoadId === null || this.drawerBoard.initLoadId === undefined)  {
      this.message.create('error', '게시판을 선택해주세요.');
      return;
    }

    /*
    const componentRef = this.viewContainerRef.createComponent(ArticleFormComponent);
    this.tabs.push(componentRef);
    */

    this.drawerArticle.initLoadId = null;
    this.drawerArticle.visible = true;
  }

  selectArticle(item: any) {
    this.drawerArticleView.article = item;
    this.drawerArticle.initLoadId = item.articleId;
  }

  editArticleByButton(item: any) {
    this.drawerArticle.initLoadId = item.articleId;
    if (this.drawerArticle.initLoadId === null || this.drawerArticle.initLoadId === undefined) {
      this.message.create('error', '게시글을 선택해주세요.');
      return;
    }

    this.drawerArticle.visible = true;
  }

  addTabArticleView(): void {
    let title: string | null = '';
    const title_lentgh = this.drawerArticleView.article?.title.length as number;
    if (title_lentgh > 8) {
      title = this.drawerArticleView.article?.title.substring(0, 8) + '...';
    } else {
      title = this.drawerArticleView.article?.title as string;
    }

    const articleId = this.drawerArticleView.article?.articleId as number;
    const article = this.drawerArticleView.article as Article;
    const newTab: TabArticle = {
      tabName: title,
      articleId: articleId,
      article: article
    }

    let tabIndex = null;
    for (const index in this.tabs) {
      if (this.tabs[index].articleId === this.drawerArticleView.article?.articleId) {
        tabIndex = index;
      }
    }

    if (tabIndex === null) {
      this.tabs.push(newTab);
      this.tabIndex = this.tabs.length;
    } else {
      this.tabIndex = parseInt(tabIndex,10) + 1;
    }

  }

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index-1, 1);
  }

  print(item: any): void {
    console.log(item);
  }

}
