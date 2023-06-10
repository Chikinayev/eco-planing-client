import {Injectable} from '@angular/core';
import {HttpService} from "../lib/http.service";
import {User} from "../model/user";
import {ResponseToken} from "../model/responseToken";
import {UserDto} from "../model/userDto";
import {EventFilterPage} from "../model/eventFilterPage";
import {ReturnFilter} from "../model/returnFilter";

@Injectable({ providedIn: 'root' })
export class UserController {

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('user')
  }

  getAllUsers(filter: EventFilterPage) {
    return this.http.toPostService0<ReturnFilter>('getAllUsers', filter);
  }

  deleteUser(userId: number) {
    return this.http.toPostService0<void>('deleteUser', {userId})
  }
}
