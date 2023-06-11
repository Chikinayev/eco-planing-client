import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {LoginServices} from "./services/login.services";
import {WebAuthController} from "./controller/WebAuthController";

@Injectable({ providedIn: 'root' })
export class MainGuard implements CanLoad {

  constructor(
    private readonly loginService: LoginServices,
    private readonly router: Router) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    await this.loginService.init();
    const isLoggedIn = !!this.loginService.authInfo;
    if (!isLoggedIn) {
      await this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }


}
