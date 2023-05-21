import {Component, inject} from '@angular/core';
import {User} from "../../model/user";
import {Role} from "../../model/role";
import {hasTwoWords} from "../../util/stringUtil";
import {WebAuthController} from "../../controller/WebAuthController";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  user: User = new User();
  userType: string = Role.ROLE_USER;
  nameError: string;
  passwordError: string;
  repeatPassword: string;
  repeatPasswordError: string;

  web: WebAuthController = inject(WebAuthController);
  constructor() {
  }

  onSubmit() {
    if (!this.validateUserForm()) {
      console.log('4444444')
      return;
    }
    console.log('555555', this.user.images);
    this.web.registration(this.user).subscribe();
  }

  private validateUserForm() {

    this.validateEmailName();
    this.validatePassword();

    return !(this.passwordError || this.nameError || this.repeatPasswordError);

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

  onFileSelected(event: any) {
    const file: File[] = event.target.files;

    const fileReader = new FileReader();

    fileReader.onload

    console.log('rrrrrr :: ', event.target.files);
    if (!this.user.images) {
      this.user.images = [];
    }
    this.user.images.push(...file);
    console.log('lenth :: ', this.user.images.length);

  }


  delImageUrl(file: File) {
    if (this.user.images){
      this.user.images = this.user.images.filter(value => value.name != file.name);
    }
  }


  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }


}
