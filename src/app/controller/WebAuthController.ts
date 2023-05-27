import {Injectable} from '@angular/core';
import {HttpService} from "../lib/http.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../model/user";
import {ResponseToken} from "../model/responseToken";

@Injectable({ providedIn: 'root' })
export class WebAuthController {

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('auth')
  }

  loadAuthInfo() {
    return this.http.toPostService0('login', {email: 'saga', password: 'Maga'})
  }

   login(email: string, password: string) {
    return this.http.toPostService0<ResponseToken>('login', {email: email, password: password})
   }

   setToken(token: string) {
    this.http.token = token;
   }

   registration(user: User) {
     console.log('333333', user);
    return this.http.toPostService0<ResponseToken>('registration', user);
   }


   postFile(file:File) {
    return this.http.postFile('asd', file);
   }


  // logout() {
  //   return this.http.getText('/logout')
  //              .toPromise()
  //              .then(() => null);
  // }
}
