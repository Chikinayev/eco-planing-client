import {Injectable} from '@angular/core';
import {EcoRegisterRequest} from "../model/ecoRegisterRequest";

@Injectable({ providedIn: 'root' })
export class AuthController {

  // private http: HttpService;
  //
  //
  // constructor(http: HttpService) {
  //   this.http = http.setControllerPrefix('plugin/asar/auth');
  // }
  //
  // registerUser(request: EcoRegisterRequest): Promise<string> {
  //   return this.http.postJson<any, string>('/register',{}, {
  //     name: request.name,
  //     surname: request.surname,
  //     password: request.password,
  //     phone: request.phone,
  //   }).toPromise().then(response => response.body, error => {throw new Error(error.error.cause.cause.message);});
  // }
  //
  // hasWholesales(): Promise<boolean> {
  //   return this.http.get<boolean>('/has-wholesales').toPromise().then(response => response.body);
  // }
  //
  // setToken(token: string) {
  //   this.http.token = token;
  // }
  //
  // sendVerification(phone: string): Promise<string> {
  //   return this.http.get<string>('/send-verification', { phone })
  //     .toPromise()
  //     .then(response => response.body, error => {throw new Error(error.error.cause.cause.message);});
  // }
  //
  // verifyCode(codeRecordId: string, code: string): Promise<boolean> {
  //   return this.http.postJson<any, boolean>("/verify-code",{}, {codeRecordId, code}).toPromise().then(response => response.body);
  // }
  //
  // changePassword(codeRecordId: string, phone: string, password: string): Promise<void> {
  //   return this.http.postJson<any, void>("/change-password",{}, {codeRecordId, phone , password}).toPromise().then(response => response.body);
  // }
  //
  // getRefCode(): Promise<string> {
  //   return this.http.get<string>('/get-ref-code').toPromise().then(response => response.body);
  // }
  //
  // forgotPassword(phone: string): Promise<string> {
  //   return this.http.get<string>('/forgot-password', {phone})
  //     .toPromise()
  //     .then(response => response.body, error => {throw new Error(error.error.cause.cause.message);});
  // }
  //
  // changeCurrentPassword(password: string) {
  //   return promisify(this.http.postJson('/change-current-password',{}, {password}));
  // }
}
