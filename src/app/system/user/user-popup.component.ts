import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';

import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { UserSessionService } from 'src/app/core/service/user-session.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { ResponseObject } from 'src/app/core/model/response-object';
import { User } from './user.model';

@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [
    CommonModule, NzCardModule, NzAvatarModule
  ],
  template: `
    <nz-card [nzBordered]="false">
      <nz-card-meta
        [nzAvatar]="avatarTemplate"
        [nzTitle]="user.name + '(' + user.userId + ')'"
        [nzDescription]="user.modifiedBy">
      </nz-card-meta>
    </nz-card>
    <ng-template #avatarTemplate>
      <nz-avatar class="avatar" [nzShape]="'square'" [nzSize]='96' [nzSrc]="imgSrc"></nz-avatar>
    </ng-template>
  `,
  styles: [`
    .card-info {
      width: 300px;
      margin-top: 16px;
    }
  `]
})
export class UserPopupComponent implements OnInit {

    /**
     * 아바타 이미지 경로
     */
    imgSrc: any;
    user: any;

    private sessionService = inject(UserSessionService);
    private modal = inject(NzModalRef);

    ngOnInit(): void {
        this.imgSrc = this.sessionService.getAvartarImageString();
        this.getMyInfo();
    }

    getMyInfo(): void {
      this.sessionService
          .getMyProfile()
          .subscribe(
              (model: ResponseObject<User>) => {
                  if ( model.total > 0 ) {
                      this.user = model.data;
                  }
                  //this.appAlarmService.changeMessage(model.message);
              }
      );
    }

    destroyModal(): void {
      this.modal.destroy({ data: 'this the result data' });
    }

}
