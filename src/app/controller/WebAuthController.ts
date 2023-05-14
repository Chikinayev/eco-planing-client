import {Injectable} from '@angular/core';
import {HttpService} from '@mybpm.workspace/http-service';
import {AuthInfo} from '@mybpm.workspace/shared/model';
import {ClientType} from '@asar/model/ClientType';
import {throwError} from 'rxjs';
import {mapBody} from '@mybpm.workspace/shared/util';

@Injectable({ providedIn: 'root' })
export class WebAuthController {

  private http: HttpService;


  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/v2/auth');
  }

  
  loadAuthInfo(): Promise<AuthInfo> {
    return this.http.get<AuthInfo>('/load-auth-info')
               .toPromise()
               .then(response => response.body);
  }

  // login(username: string, password: string): Promise<string> {
  //   const timeOffsetZoneInMinutes = new Date().getTimezoneOffset();
  //   return this.http.post<string>('/login', { username, password, timeOffsetZoneInMinutes })
  //              .toPromise()
  //              .then(response => response.body);
  // }

  login(username: string, password: string): Promise<string> {
    const clientType = ClientType.WEB;
    const timeOffsetZoneInMinutes = new Date().getTimezoneOffset();
    const userAgent = window.navigator.userAgent;

    if (!!username.match(/^[a-z]$/i) && !!password.match(/^[a-z]$/i)) {
      return throwError(undefined).toPromise();
    }

    return mapBody(
      this.http.postJson0<any, any>('/v3/login', {
          'dXNlcm5hbWU=': window.btoa(username),
          'cGFzc3dvcmQ=': window.btoa(password),
          timeOffsetZoneInMinutes,
          clientType,
          userAgent,
        },
      ),
    ).toPromise();
  }

  logout() {
    return this.http.getText('/logout')
               .toPromise()
               .then(() => null);
  }
}
