import {Component, inject, OnInit} from '@angular/core';
import {WebAuthController} from "../../../controller/WebAuthController";
import {Router} from "@angular/router";
import {LoginServices} from "../../../services/login.services";
import {tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  email: string;
  password: string;
  errorMessage: string;
  // web: WebAuthController = inject(WebAuthController);
  constructor(private readonly router: Router,
              private loginService: LoginServices) {

  }


  login(): void {
    if (!this.email) {
      this.errorMessage = 'майл не болжен быть пустым';
    }
    if (!this.password){
      this.errorMessage = 'пароль не должен быть пустым';
    }
    this.loginService.login(this.email, this.password, this.errorMessage).pipe(
      catchError(err => {
        if (err.status === 403) {
          this.errorMessage = 'Логин и пароль неправильный';
        } else {
          this.errorMessage = 'Произошла ошибка. Пожалуйста, попробуйте еще раз.';
        }
        return throwError(err);
      })
    ).subscribe();
    // выполнение логики для входа пользователя
  }

  ngOnInit(): void {
  }

  navigateToForgotPassword() {
    this.router.navigateByUrl('forgot-password').then();
  }

  redirectToRegister() {
    this.router.navigate(['register']).then();
  }

  isRequired: boolean = true;
  emailValue: string = '';
}

