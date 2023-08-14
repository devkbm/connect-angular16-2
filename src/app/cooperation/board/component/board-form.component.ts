import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BoardService } from './board.service';

import { ResponseObject } from '../../../core/model/response-object';
import { Board } from './board.model';
import { BoardHierarchy } from './board-hierarchy.model';
import { ResponseList } from '../../../core/model/response-list';
import { FormBase, FormType } from 'src/app/core/form/form-base';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent extends FormBase implements OnInit, AfterViewInit {

  @ViewChild('boardName', { static: true }) boardName!: NzInputTextComponent;

  parentBoardItems: BoardHierarchy[] = [];

  boardTypeList: any;

  override fg = this.fb.group({
    boardId         : new FormControl<string | null>(null),
    boardParentId   : new FormControl<string | null>(null),
    boardName       : new FormControl<string | null>('', { validators: [Validators.required] }),
    boardType       : new FormControl<string | null>('', { validators: [Validators.required] }),
    boardDescription: new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: BoardService) {
    super();
  }

  ngOnInit() {
    this.getboardHierarchy();
    this.getBoardTypeList();

    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }
  }

  ngAfterViewInit(): void {
    this.boardName.focus();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('boardId')?.enable();

    this.fg.get('boardType')?.setValue('BOARD');
  }

  modifyForm(formData: Board): void {
    this.formType = FormType.MODIFY;

    this.fg.get('boardId')?.disable();

    this.fg.patchValue(formData);
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: string): void {
    this.service.getBoard(id)
        .subscribe(
          (model: ResponseObject<Board>) => {
            if (model.data) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
          }
        );
  }

  save(): void {
    this.service
        .saveBoard(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Board>) => {
            console.log(model);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(): void {
    this.service
        .deleteBoard(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Board>) => {
            console.log(model);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  getboardHierarchy(): void {
    this.service
        .getBoardHierarchy()
        .subscribe(
          (model: ResponseList<BoardHierarchy>) => {
            if ( model.total > 0 ) {
              this.parentBoardItems = model.data;
            } else {
              this.parentBoardItems = [];
            }
            //this.appAlarmService.changeMessage(model.message);
            // title 노드 텍스트
            // key   데이터 키
            // isLeaf 마지막 노드 여부
            // checked 체크 여부
          }
        );
  }

  getBoardTypeList(): void {
    this.service
        .getBoardTypeList()
        .subscribe(
          (model: ResponseObject<any>) => {
            if (model.data) {
              this.boardTypeList = model.data;
            } else {
              this.boardTypeList = [];
            }
          }
        );
  }

}
