import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {User} from "../../model/user";
import {Role} from "../../model/role";
import {hasTwoWords} from "../../util/stringUtil";
import {WebAuthController} from "../../controller/WebAuthController";
import {Router} from "@angular/router";
import {City} from "../../model/city";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  user: User = new User();
  selectedRole: Role;
  // images: File[];
  nameError: string;
  passwordError: string;
  repeatPassword: string;
  repeatPasswordError: string;
  phoneError: string;
  roles: Role;
  @ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>;

  web: WebAuthController = inject(WebAuthController);
  constructor(private readonly router: Router) {
  }

  onSubmit() {
    if (!this.validateUserForm()) {
      return;
    }
    this.user.roles = [this.roles];
    this.web.registration(this.user).toPromise().then(value => {
      this.web.setToken(value.token);
      const queryParams = value.userDto;
        this.router.navigate(['profile'], {queryParams}).then()
    });
  }

  private validateUserForm() {

    this.validateEmailName();
    this.validatePassword();
    this.validatePhone();

    return !(this.passwordError || this.nameError || this.repeatPasswordError || this.phoneError);

  }
  private validatePassword() {
    if (this.user.password.length == 0 || this.user.password.length < 2) {
      this.passwordError = 'Нужно заполнить';
    } else {
      this.passwordError = '';
    }
    if (this.user.password !== this.repeatPassword) {
      this.repeatPasswordError = 'Пароль не совпадает';
    } else {
      this.repeatPasswordError = '';
    }
    if (!this.user.password.match('[A-Za-z0-9]*')){
      this.passwordError = 'Обязательно к заплонению';
    }else {
      this.passwordError = '';
    }
  }

  validatePhone() {
    if (!this.user.phoneNumber.match(/^\d{11}$/)) {
      this.phoneError = 'Длина номера должна быть 11';
    } else {
      this.phoneError = ''
    }

  }



  addToRoles() {
    if (this.selectedRole) {
      this.user.roles.push(this.selectedRole);
    }
  }

  validateEmailName() {
    if (!hasTwoWords(this.user.firstName)) {
      this.nameError = 'Минимум 2 слово'
    }
    if (this.user.firstName.length == 0) {
      this.nameError = 'Обязательно к заполнению';
    }
    else {
      this.nameError = '';
    }
  }

  protected readonly UserType = Role;

  changeRole() {
    this.user.roles. splice(0, this.user.roles.length);
    this.addToRoles();
  }

  protected readonly City = City;
}
