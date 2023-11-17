import { Self, Optional, Component, Input, TemplateRef, ViewChild, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgModel, NgControl, FormsModule } from '@angular/forms';
import { NzFormControlComponent, NzFormModule } from 'ng-zorro-antd/form';

import { CKEditorComponent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { MyUploadAdapter } from './my-upload-adapter';

// https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/frameworks/angular.html
// https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/installing-plugins.html
// https://ckeditor.com/ckeditor-5/online-builder/

@Component({
  standalone: true,
  selector: 'app-nz-input-ckeditor',
  imports: [FormsModule, NzFormModule, CKEditorModule],
  template: `
   <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip" #control>
        <!-- tagName="textarea" -->
        <ckeditor #ckEditor
          [editor]="Editor"
          [config]="editorConfig"
          [disabled]="disabled"
          [ngModel]="_value"
          (change)="textChange($event)"
          (blur)="onTouched()"
          (ready)="onReady($event)">
        </ckeditor>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [`
    :host /*::ng-deep*/ .ck-editor__editable {
      color: black;
      height: var(--height);
    }
  `]
})
export class NzInputCkeditorComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild(NzFormControlComponent, {static: true})
  control!: NzFormControlComponent;
  @ViewChild('ckEditor', { static: true })
  ckEditor!: CKEditorComponent;

  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';

  @HostBinding("style.--height")
  @Input() height: string = '100px';

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  _value: any;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  Editor = ClassicEditor;
  editorConfig;

  constructor(@Self()  @Optional() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.editorConfig = {
      language: 'ko',
      toolbar: [
        'heading', '|',
        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
        'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify', '|',
        'bulletedList', 'numberedList', 'todoList', '|',
        '-', // break point
        'uploadImage', 'insertTable', '|',
        'outdent', 'indent', '|',
        'blockQuote', 'codeBlock', '|',
        'link', '|',
        'undo', 'redo'
      ],
      image: {
        toolbar: [
          'imageStyle:inline',
          'imageStyle:block',
          'imageStyle:side',
          '|',
          'toggleImageCaption',
          'imageTextAlternative'
        ]
      },
      extraPlugins: [
        function (editor: any) {
          editor.plugins.get('FileRepository').createUploadAdapter = (loader :any) => {
            return new MyUploadAdapter(loader);
          };
        }
      ]
    };
  }

  ngOnInit(): void {
    this.control.nzValidateStatus = this.ngControl.control as AbstractControl;
  }

  ngAfterViewInit(): void {

    //console.log(this.element?.nativeElement.value);
    //this.ckEditor.writeValue(this.value);
  }

  onReady(editor: any): void {
    //this.MyCustomUploadAdapterPlugin(editor);
    //editor.extraPlugins = [this.MyCustomUploadAdapterPlugin(editor)];
  }

  MyCustomUploadAdapterPlugin(editor: any ): any {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader: any ) => {
      return new MyUploadAdapter( loader );
    }
  }

  logging(params: any) {
    console.log(params);
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  //textChange( {editor}: ChangeEvent): void {
  textChange( {editor}: any): void {
    this._value = editor.getData();
    this.onChange(this._value);
  }

}
