import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MainGuard implements CanLoad {

  constructor(
    // private readonly loginService: LoginService,
    private readonly router: Router) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    // await this.loginService.init();
    // const isLoggedIn = !!this.loginService.authInfo;
    console.log('qwewqeqwewqeqw')
    // if (!isLoggedIn && (segments.length === 0 || segments[0].path !== 'set-new-password')) {
      await this.router.navigateByUrl('/login');
      return false;
    // }
    // return true;
  }


}
