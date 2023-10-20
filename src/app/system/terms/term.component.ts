import { AfterContentInit, AfterViewInit, Component, ContentChild, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';

import { TermGridComponent } from './term-grid.component';
import { DataDomainGridComponent } from './data-domain-grid.component';
import { WordGridComponent } from './word-grid.component';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent extends AppBase implements OnInit {

  @ViewChild('termGrid') termGrid!: TermGridComponent;
  @ViewChild('wordGrid') wordGrid!: WordGridComponent;
  @ViewChild('domainGrid') domainGrid!: DataDomainGridComponent;

  query: { key: string, value: string, list: {label: string, value: string}[] } = {
    key: 'term',
    value: '',
    list: [
      {label: '용어', value: 'term'},
      {label: '업무영역', value: 'domain'}
    ]
  }

  tabIndex: number = 0;

  termDrawer: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  wordDrawer: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  domainDrawer: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  ngOnInit(): void {
  }

  getList() {
    if (this.tabIndex === 0) {
      this.getTermList();
    } else if (this.tabIndex === 1) {
      this.getWordList();
    } else if (this.tabIndex === 2) {
      this.getDomainList();
    }
  }

  //#region 용어사전
  getTermList() {
    let params: any = new Object();
    if ( this.query.value !== '') {
      params[this.query.key] = this.query.value;
    }

    this.termDrawer.visible = false;
    this.termGrid.getList(params);
  }

  newTerm() {
    this.termDrawer.initLoadId = null;
    this.termDrawer.visible = true;
  }

  editTerm(item: any) {
    this.termDrawer.initLoadId = item.termId;
    this.termDrawer.visible = true;
  }

  termGridSelected(item: any) {
    this.termDrawer.initLoadId = item.termId;
  }
  //#endregion 용어사전

  //#region 단어사전
  getWordList() {
    this.wordDrawer.visible = false;
    this.wordGrid.getList();
  }

  newWord() {
    this.wordDrawer.initLoadId = null;
    this.wordDrawer.visible = true;
  }

  editWord(item: any) {
    this.wordDrawer.initLoadId = item.logicalName;
    this.wordDrawer.visible = true;
  }

  wordGridSelected(item: any) {
    this.wordDrawer.initLoadId = item.logicalName;
  }
  //#endregion 단어사전

  //#region 도메인
  getDomainList() {
    this.domainDrawer.visible = false;
    this.domainGrid.getList();
  }

  newDomain() {
    this.domainDrawer.initLoadId = null;
    this.domainDrawer.visible = true;
  }

  domainGridSelected(item: any) {
    this.domainDrawer.initLoadId = item.domainId;
  }
  //#endregion 도메인

}
