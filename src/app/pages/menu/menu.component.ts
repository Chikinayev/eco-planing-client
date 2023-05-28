import { Component } from '@angular/core';
import {LoginServices} from "../../services/login.services";
import {tap} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  userName: string;

  constructor(private readonly loginServices: LoginServices) {
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

}
