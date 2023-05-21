import {Injectable} from "@angular/core";
import {AuthController} from "../controller/AuthController";
import {WebAuthController} from "../controller/WebAuthController";
import {tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class LoginServices {



  errorMessage: string;

  constructor(private readonly auth: WebAuthController) {
  }

  login(email: string, password: string) {
    if (!email) {
      return;
    }
    if (!password) {
      return;
    }
    this.auth.login(email, password).pipe(
      tap(value => {
        this.auth.setToken(value.token);
        console.log('ttttttttt :: ', value)}),
      catchError(err => {
        if (err.status === 403) {
          this.errorMessage = 'У вас нет разрешения для доступа к этому ресурсу.';
        } else {
          this.errorMessage = 'Произошла ошибка. Пожалуйста, попробуйте еще раз.';
        }
        console.log('qweqwwwwwwwwwwwwwwww')
        return throwError(err);
      })
    ).subscribe();
  }

  validateLogin(email: string, password: string) {

  }

  validateEmail() {

  }


}
