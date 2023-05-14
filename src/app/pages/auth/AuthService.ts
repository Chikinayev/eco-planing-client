import {Injectable} from "@angular/core";
import {WebAuthController} from "../../controller/WebAuthController";
import {AuthController} from "../../controller/AuthController";
import {NotificationService} from "../../libs/notification/notification.service";
import {AuthStatus} from "../../model/login/AuthStatus";
import {AsarRegisterRequest} from "../../model/AsarRegisterRequest";
import {phoneToUsername} from "../../util/stringUtil";
import {AuthInfo} from "../../model/login/AuthInfo";


@Injectable({ providedIn: 'root' })
export class AuthService {

  status: AuthStatus = AuthStatus.CHECKING;
  disabledLogin: boolean;
  authInfo: AuthInfo | null = null;
  phone: string;
  password: string;
  loginError: string | null = null;


  constructor(private readonly authController: AuthController,
              private readonly webAuthController: WebAuthController,
              private readonly notification: NotificationService) {}


  async init() {

    this.status = AuthStatus.CHECKING;
    this.disabledLogin = false;
    this.loginError = null;

    try {

      this.authInfo = await this.webAuthController.loadAuthInfo();
      if (this.authInfo) {
        this.authInfo.hasWholesales = await this.authController.hasWholesales();
      }
      this.status = this.authInfo ? AuthStatus.OK : AuthStatus.ANONYMOUSLY;

      if (this.authInfo) {
        document.title = `ASAR - ${this.authInfo.fio}`;

      } else {

        document.title = 'ASAR';

      }

    } catch (e) {

      console.error(e);

      this.status = AuthStatus.ANONYMOUSLY

      this.authInfo = null;
      throw new Error(e.toString());
    }

  }

  checkSmsCode(codeRecord: string, code: string): Promise<boolean> {
    return this.authController.verifyCode(codeRecord, code);
  }

  async registerUser(registerRequest: AsarRegisterRequest) {

    try {
      const token = await this.authController.registerUser(registerRequest);

      this.authController.setToken(token);

      await this.init();
    } catch (e) {
      console.error(e);

      this.notification.showError(e.toString());

    }
  }

  async enter() {
    if (!this.phone) {
      return;
    }
    if (!this.password) {
      return;
    }

    this.disabledLogin = true;

    try {

      const username = phoneToUsername(this.phone);

      const token = await this.webAuthController.login(username, this.password);

      this.authController.setToken(token);
      await this.init();

    } catch (e) {

      console.error(e);

      this.notification.showError(e.error.message.toString());

      this.loginError = e.error.message;

    } finally {

      this.disabledLogin = false;

    }

  }

  async out() {

    await this.webAuthController.logout();

    this.authController.setToken(undefined);
  }

}
