import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserProfileController {
  // http: HttpService;
  //
  // constructor(http: HttpService) {
  //   this.http = http.setControllerPrefix('user-profile');
  // }
  //
  // loadPersonProfileDetails(personId: string): Promise<PersonProfileDetails> {
  //   return promisify(this.http.post<PersonProfileDetails>('/load-person-profile-details', { personId }));
  // }
  //
  // updatePersonPassword(personId: string, oldPassword: string, newPassword: string) {
  //   return promisify(this.http.post<void>('/update-person-password', { personId, oldPassword, newPassword }));
  // }
  //
  // updatePersonEmail(personId: string, email: string): Promise<void> {
  //   return promisify(this.http.post<void>('/update-person-email', { personId, email }));
  // }
  //
  // updatePersonPhone(personId: string, phone: string): Promise<void> {
  //   return promisify(this.http.post<void>('/update-person-phone', { personId, phone }));
  // }
}
