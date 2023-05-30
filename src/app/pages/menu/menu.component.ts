import { Component } from '@angular/core';
import {LoginServices} from "../../services/login.services";
import {tap} from "rxjs";
import {WebAuthController} from "../../controller/WebAuthController";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  userName: string;

  constructor(private readonly loginServices: LoginServices,
              private readonly web: WebAuthController,
              private readonly router: Router) {
    this.init();
  }

  init() {
    this.loginServices.user$.pipe(
      tap(value => {
        if (value) {
          this.userName = value.fio;
        }
      })
    ).
      subscribe();
  }

  logout() {
    this.web.setToken(undefined);
    this.userName = undefined;
    this.router.navigate(['/login']).then();

  }

  main() {
    this.router.navigate(['/main']).then();
  }

  organizations() {
    this.router.navigate(['organizations']).then();
  }

  profile() {
    this.router.navigate(['profile']).then();
  }
  loginIn(){
    this.router.navigate(['login']).then();
  }

  about(){
    this.router.navigate(['about']).then();
  }
}
