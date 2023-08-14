import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { WordService } from './word.service';
import { Word } from './word.model';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.css']
})
export class WordFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('logicalName') logicalName?: NzInputTextComponent;

  override fg = this.fb.group({
    logicalName     : new FormControl<string | null>(null, { validators: Validators.required }),
    physicalName    : new FormControl<string | null>(null, { validators: Validators.required }),
    logicalNameEng  : new FormControl<string | null>(null),
    comment         : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: WordService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit() {
    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }
  }

  ngAfterViewInit(): void {
    this.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  focus() {
    this.logicalName?.focus();
  }

  newForm() {
    this.formType = FormType.NEW;

    this.fg.controls.logicalName.enable();
    this.fg.controls.physicalName.enable();
  }

  modifyForm(formData: Word) {
    this.formType = FormType.MODIFY;

    this.fg.controls.logicalName.disable();
    this.fg.controls.physicalName.disable();

    this.fg.patchValue(formData);
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: string) {
    this.service
        .get(id)
        .subscribe(
          (model: ResponseObject<Word>) => {
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
          (model: ResponseObject<Word>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  remove() {
    this.service
        .delete(this.fg.controls.logicalName.value!)
        .subscribe(
          (model: ResponseObject<Word>) => {
            this.formDeleted.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

}
