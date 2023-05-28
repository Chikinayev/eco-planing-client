import {Component, inject, OnInit} from '@angular/core';
import {WebAuthController} from "../../../controller/WebAuthController";
import {Router} from "@angular/router";
import {LoginServices} from "../../../services/login.services";

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
    console.log(`Username: ${this.email}, Password: ${this.password}`);
    this.loginService.login(this.email, this.password, this.errorMessage);
    // выполнение логики для входа пользователя
  }

  ngOnInit(): void {
    console.log('pppppppppppp')
  }

  navigateToForgotPassword() {
    this.router.navigateByUrl('forgot-password').then();
  }

  redirectToRegister() {
    this.router.navigate(['register']).then();
  }
}

