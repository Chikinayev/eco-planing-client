import {Injectable} from "@angular/core";
import {AuthController} from "../controller/AuthController";
import {WebAuthController} from "../controller/WebAuthController";
import {tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class LoginServices {

  constructor(private readonly auth: WebAuthController,
              private readonly router: Router) {
  }

  login(email: string, password: string, errorMessage: string) {
    if (!email) {
      return;
    }
    if (!password) {
      return;
    }
    this.auth.login(email, password).pipe(
      tap(value => {
        this.auth.setToken(value.token);

        const queryParams = value.userDto;
        this.router.navigate(['profile'], {queryParams}).then();
        console.log('ttttttttt :: ', value)}),
      catchError(err => {
        if (err.status === 403) {
          errorMessage = 'У вас нет разрешения для доступа к этому ресурсу.';
        } else {
          errorMessage = 'Произошла ошибка. Пожалуйста, попробуйте еще раз.';
        }

        return throwError(err);
      })
    ).subscribe();
  }

  validateLogin(email: string, password: string) {

  }

  validateEmail() {

  }


}
