import { Location } from '@angular/common';

export class AppBase {

  protected appId: string = '';

  //private programService: WebResourceService;

  constructor(protected _location: Location) {
    //this.programService = AppInjector.injector.get(WebResourceService);
  }

  goBack() {
    this._location.back();
  }

  goFoward() {
    this._location.forward();
  }

  //getAppInfo(): Observable<ResponseObject<WebResource>> {
    //return this.programService.getProgram(this.appId);
  //}

}
