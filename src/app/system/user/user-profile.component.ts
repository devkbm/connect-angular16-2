import { Component, OnInit, inject } from '@angular/core';

import { UserSessionService } from 'src/app/core/service/user-session.service';
import { ResponseObject } from 'src/app/core/model/response-object';
import { User } from './user.model';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule, NzAvatarModule, NzIconModule
  ],
  template: `
    <div class="card">
      <nz-avatar
        [nzSrc]="profilePictureSrc"
        nzIcon="user"
        [nzSize]='48'>
      </nz-avatar>
      {{user?.name}}
    </div>
  `,
  styles: [`
    .card {
      width: 200px;
      height: 100px;
      background-color: green;
      border: 1px solid rgb(232, 232, 232);
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    .card:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
  `]
})
export class UserProfileComponent implements OnInit {

  profilePictureSrc: any;
  user?: User;

  private sessionService = inject(UserSessionService);

  ngOnInit() {
    this.profilePictureSrc = this.sessionService.getAvartarImageString();
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
            }
        );
  }
}
