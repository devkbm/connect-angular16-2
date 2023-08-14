import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { StaffService } from './staff.service';
import { Staff } from './staff.model';
import { GlobalProperty } from 'src/app/core/global-property';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-staff-regist-form',
  templateUrl: './staff-regist-form.component.html',
  styleUrls: ['./staff-regist-form.component.css']
})
export class StaffRegistFormComponent extends FormBase implements OnInit {

  @Input() staffNo?: string;

  imageUrl: any;

  upload: {url: string, headers:any, data: any} = {
    url: GlobalProperty.serverUrl + '/api/hrm/staff/changeimage',
    headers: { Authorization: sessionStorage.getItem('token') },
    data: null
  }

  genderOptions = [
    {label: '남', value: 'M'},
    {label: '여', value: 'F'}
  ];

  override fg = this.fb.group({
    staffNo                     : new FormControl<string | null>(null, { validators: Validators.required }),
    name                        : new FormControl<string | null>(null, { validators: Validators.required }),
    nameEng                     : new FormControl<string | null>(null),
    nameChi                     : new FormControl<string | null>(null),
    residentRegistrationNumber  : new FormControl<string | null>(null),
    gender                      : new FormControl<string | null>(null),
    birthday                    : new FormControl<Date | null>(null),
    workCondition               : new FormControl<string | null>(null),
    imagePath                   : new FormControl<string | null>(null)
  });

  constructor(private fb: FormBuilder,
              private service: StaffService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit(): void {
    this.newForm();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
  }

  modifyForm(formData: Staff): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(staffId: string): void {
    this.service
        .get(staffId)
        .subscribe(
          (model: ResponseObject<Staff>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);

              this.upload.data = { staffId: model.data.staffNo };

              if (model.data.imagePath) {
                this.imageUrl = GlobalProperty.serverUrl + '/static/' + model.data.imagePath;
              }
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );
  }

  save(): void {
    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Staff>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(id: any): void {
    /*this.appointmentCodeService
        .deleteAppointmentCodeDetail(this.fg.get('code').value)
        .subscribe(
            (model: ResponseObject<AppointmentCodeDetail>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );*/
  }

  handleChange(param: NzUploadChangeParam): void {
    console.log(param);
    if (param.type === 'success') {
      const serverFilePath = param.file.response.data;
      this.imageUrl = GlobalProperty.serverUrl + '/static/' + this.findFileName(serverFilePath);
    }
  }

  private findFileName(path: string): string {
    const names: string[] = path.split("\\");
    return names[names.length-1];
  }

  downloadImage(params: any): void {

    this.service
        .downloadStaffImage(this.fg.controls.staffNo.value!)
        .subscribe(
          (model: Blob) => {
            //this.appAlarmService.changeMessage(model.message);
            const blob = new Blob([model], { type: 'application/octet-stream' });
            saveAs(blob, this.fg.get('staffNo')?.value+".jpg");

          }
        );
  }

}
