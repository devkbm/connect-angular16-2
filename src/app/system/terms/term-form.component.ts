import { DataDomain } from './data-domain.model';
import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TermService } from './term.service';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { ResponseObject } from 'src/app/core/model/response-object';
import { Term } from './term.model';
import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseList } from 'src/app/core/model/response-list';
import { WordService } from './word.service';
import { Word } from './word.model';
import { DataDomainService } from './data-domain.service';

@Component({
  selector: 'app-term-form',
  templateUrl: './term-form.component.html',
  styleUrls: ['./term-form.component.css']
})
export class TermFormComponent extends FormBase implements OnInit, AfterViewInit {
  systemTypeList: any;
  wordList: Word[] = [];
  dataDomainList: DataDomain[] = [];

  override fg = this.fb.group({
    termId       : new FormControl<string | null>(null),
    system       : new FormControl<string | null>(null, { validators: Validators.required }),
    term         : new FormControl<string | null>(null, { validators: Validators.required }),
    termEng      : new FormControl<string | null>(null),
    columnName   : new FormControl<string | null>(null),
    dataDomainId : new FormControl<string | null>(null),
    description  : new FormControl<string | null>(null),
    comment      : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: TermService,
              private wordService: WordService,
              private dataDomainService: DataDomainService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit(): void {
    this.getSystemTypeList();
    this.getWordList();
    this.getDataDoaminList();

    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }
  }

  ngAfterViewInit(): void {

  }

  newForm() {
    this.formType = FormType.NEW;

    this.fg.controls.termId.disable();
    this.fg.controls.columnName.disable();
    this.fg.controls.system.enable();
    this.fg.controls.term.enable();
  }

  modifyForm(formData: Term) {
    this.formType = FormType.MODIFY;

    this.fg.controls.termId.disable();
    this.fg.controls.columnName.disable();
    this.fg.controls.system.disable();
    this.fg.controls.term.disable();

    this.fg.patchValue(formData);
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: string) {
    this.service
        .get(id)
        .subscribe(
          (model: ResponseObject<Term>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  save() {
    if (this.fg.invalid) {
      this.checkForm()
      return;
    }

    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Term>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove() {
    this.service
        .delete(this.fg.controls.termId.value!)
        .subscribe(
          (model: ResponseObject<Term>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  getSystemTypeList() {
    this.service
        .getSystemTypeList()
        .subscribe(
          (model: ResponseList<any>) => {
            this.systemTypeList = model.data;
          }
        );
  }

  getWordList() {
    this.wordService
        .getList()
        .subscribe(
          (model: ResponseList<Word>) => {
            this.wordList = model.data;
          }
        );
  }

  getDataDoaminList() {
    this.dataDomainService
        .getList()
        .subscribe(
          (model: ResponseList<DataDomain>) => {
            this.dataDomainList = model.data;
          }
        );
  }

}
