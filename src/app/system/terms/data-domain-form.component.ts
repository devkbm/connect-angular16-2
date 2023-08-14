import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { DataDomainService } from './data-domain.service';
import { DataDomain } from './data-domain.model';
import { HtmlSelectOption } from 'src/app/shared/nz-input-select/html-select-option';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';


@Component({
  selector: 'app-data-domain-form',
  templateUrl: './data-domain-form.component.html',
  styleUrls: ['./data-domain-form.component.css']
})
export class DataDomainFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  databaseList: HtmlSelectOption[] = [];

  @ViewChild('domainName') domainName?: NzInputTextComponent;

  override fg = this.fb.group({
    domainId      : new FormControl<string | null>(null, { validators: Validators.required }),
    domainName    : new FormControl<string | null>(null, { validators: Validators.required }),
    database      : new FormControl<string | null>(null, { validators: Validators.required }),
    dataType      : new FormControl<string | null>(null),
    comment       : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: DataDomainService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
    this.getDatabaseList();

    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }
  }

  ngAfterViewInit(): void {
    this.focus();
  }

  focus() {
    this.domainName?.focus();
  }

  newForm() {
    this.formType = FormType.NEW;

    this.fg.controls.database.enable();
    this.fg.controls.domainName.enable();

    this.fg.controls.domainName.setValue('MYSQL');
  }

  modifyForm(formData: DataDomain) {
    this.formType = FormType.MODIFY;

    this.fg.controls.database.disable();
    this.fg.controls.domainName.disable();

    this.fg.patchValue(formData);
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: string) {
    this.service
        .get(id)
        .subscribe(
          (model: ResponseObject<DataDomain>) => {
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
          (model: ResponseObject<DataDomain>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  remove() {
    this.service
        .delete(this.fg.controls.domainId.value!)
        .subscribe(
          (model: ResponseObject<DataDomain>) => {
            this.formDeleted.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  getDatabaseList() {
    this.service
        .getDatabaseList()
        .subscribe(
          (model: ResponseList<HtmlSelectOption>) => {
            this.databaseList = model.data;
          }
        );
  }
}
