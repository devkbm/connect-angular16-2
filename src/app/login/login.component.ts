import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { UserToken } from './user-token.model';
import { SessionManager } from 'src/app/core/session-manager';
import { WindowRef } from 'src/app/core/window-ref';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    organizationCode  : new FormControl<string | null>('001', { validators: Validators.required }),
    staffNo           : new FormControl<string | null>(null, { validators: Validators.required }),
    password          : new FormControl<string | null>(null, { validators: Validators.required }),
    remember          : new FormControl<boolean>(false, { validators: Validators.required })
  });

  private FIRST_PAGE_URL = '/home';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private winRef: WindowRef
    ) {
      console.log(winRef);
  }

  ngOnInit(): void {
    const token = this.route.snapshot.params['id'];

    if (token != null) {
      sessionStorage.setItem('token', token);

      this.loginService.getAuthToken()
          .subscribe(
            (model: UserToken) => {
              this.setItemSessionStorage(model);

              this.router.navigate([this.FIRST_PAGE_URL]);
            }
          );
    }
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    /*
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[ i ].markAsDirty();
      this.loginForm.controls[ i ].updateValueAndValidity();
    }
    */

    this.loginService
        .doLogin('001', this.form.value.staffNo!, this.form.value.password!)
        .subscribe(
          (model: UserToken) => {
          this.setItemSessionStorage(model);

          this.router.navigate([this.FIRST_PAGE_URL]);
          }
        );
  }

  private setItemSessionStorage(data: UserToken) {
    SessionManager.saveSessionStorage(data);
  }

  socialLogin(): void {
    // tslint:disable-next-line:forin
    /*
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[ i ].markAsDirty();
      this.loginForm.controls[ i ].updateValueAndValidity();
    }
    */
    console.log(this.form.get('userName')?.value);


    window.location.href = 'http://localhost:8090/oauth2/authorization/google';

    /*
    window.location.href =
      'http://localhost:8090/oauth2/authorization/google?response_type=code&' +
      'scope=profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&'+
      'client_id=' + '497322312042-mstkseqfmr5t8r7nch5bp17r9lh5eoen.apps.googleusercontent.com'+
      '&redirect_uri='+ 'http%3A%2F%2Flocalhost%3A8090%2Flogin%2Foauth2%2Fcode%2Fgoogle';
    */
    /*
    this.loginService
      .getSocialLogin()
      .subscribe(
        (model: any) => {
          this.router.navigate(['/home']);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
          this.router.navigate(['/home']);
        }
      );
    */
  }

  socialLogin2(): void {
    this.loginService.getAuthToken()
          .subscribe(
            (model: UserToken) => {
              console.log(model);

              sessionStorage.setItem('token', model.sessionId);
              sessionStorage.setItem('imageUrl', model.imageUrl);
              sessionStorage.setItem('menuGroupList', JSON.stringify(model.menuGroupList));
              sessionStorage.setItem('roleList', JSON.stringify(model.roleList));

              this.router.navigate(['/home']);
            }
          );
  }

  test() {
    //window.open('/home','_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,status=no,top=500,left=500,width=400,height=400');
    const popOption = 'scrollbars=yes, menubar=no, resizable=no, top=500, left=500, width=400, height=400';
    var windowObjectReference = this.winRef.nativeWindow.open('/home/board', "", popOption);
    windowObjectReference.focus();

    console.log(windowObjectReference);
  }
}
