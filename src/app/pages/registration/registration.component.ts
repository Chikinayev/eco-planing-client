import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {User} from "../../model/user";
import {Role} from "../../model/role";
import {hasTwoWords} from "../../util/stringUtil";
import {WebAuthController} from "../../controller/WebAuthController";
import {Router} from "@angular/router";

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
  roles: string[];
  @ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>;

  web: WebAuthController = inject(WebAuthController);
  constructor(private readonly router: Router) {
    this.roles = Object.values(Role);
  }

  onSubmit() {
    if (!this.validateUserForm()) {
      console.log('4444444')
      return;
    }
    // console.log('555555', this.images);
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
      console.log('aaaaa');
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

  // onFileSelected(event: any) {
  // const filesList: FileList = event.target.files;
  // if (!this.images) {
  //   this.images = [];
  // }
  // for (let i = 0; i < filesList.length; i++) {
  //   const file: File | null = filesList.item(i);
  //   if (file) {
  //     this.images.push(file);
  //   }
  // }
  //   if (this.fileInputRef) {
  //     this.fileInputRef.nativeElement.value = '';
  //   }
  //
  // console.log('www :: ', this.user);
  // console.log('rrr :: ', this.images);
  // }

  //   delImageUrl(file: File) {
  //   if (this.images){
  //     this.images = this.images.filter(value => value.name != file.name);
  //   }
  // }
  //
  //
  // getImageUrl(file: File): string {
  //   console.log('ppp :: ', file);
  //   return URL.createObjectURL(file);
  // }


  changeRole() {
    this.user.roles. splice(0, this.user.roles.length);
    this.addToRoles();
  }
}
