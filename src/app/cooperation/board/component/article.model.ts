import { ArticleRead } from './article-read.model';

export interface Article {
  articleId: number;
  boardId: number;
  articleParentId: number;
  title: string;
  contents: string;
  pwd: string;
  hitCnt: string;
  fromDate: string;
  toDate: string;
  seq: number;
  depth: number;
  articleChecks: ArticleRead[];
  fileList: string[];
  file: File;
  editable: boolean
}
