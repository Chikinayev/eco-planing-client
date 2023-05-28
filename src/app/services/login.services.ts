import {Injectable} from "@angular/core";
import {WebAuthController} from "../controller/WebAuthController";
import {BehaviorSubject, Observable, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {UserDto} from "../model/userDto";

@Injectable({providedIn: 'root'})
export class LoginServices {
  private userSubject = new BehaviorSubject<UserDto>(null);
  user$: Observable<UserDto> = this.userSubject.asObservable();

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
        this.userSubject.next(value.userDto);
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


}
