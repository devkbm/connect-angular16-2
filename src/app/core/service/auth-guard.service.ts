
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { LoginService } from "src/app/login/login.service";
import { UserToken } from "src/app/login/user-token.model";

@Injectable()
export class AuthGuardService implements CanActivate,CanActivateChild {

  constructor(private loginService: LoginService,
              private router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return new Observable<boolean>(e => {
      this.loginService.getAuthToken()
                       .subscribe((model: UserToken) => {
                        if (this.isAuthenticated(model.sessionId)) {
                          e.next(true);
                        } else {
                          e.next(false);
                          this.router.navigate(['/login']);
                        }
                      });
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
      return new Observable<boolean>(e => {
        this.loginService.getAuthToken()
                         .subscribe((model: UserToken) => {
                          if (this.isAuthenticated(model.sessionId)) {
                            e.next(true);
                          } else {
                            e.next(false);
                            this.router.navigate(['/login']);
                          }
                        });
          });
  }

  private isAuthenticated(token: string): boolean {
    const session_token = sessionStorage.getItem('token') as string;
    return session_token === token ? true : false;
  }

}
