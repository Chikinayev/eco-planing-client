import {NotificationBodyComponent, NotificationData, NotificationType} from './notification-body.component';
import {Inject, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ComponentType} from '@angular/cdk/overlay';
import {ActiveToast} from 'ngx-toastr/toastr/toastr.service';
import {IndividualConfig} from 'ngx-toastr/toastr/toastr-config';

@Injectable()
export class NotificationService {
  config: any = {
    toastComponent: NotificationBodyComponent,
    positionClass: 'toast-bottom-right',
    toastClass: 'toast',
    extendedTimeOut: 0,
    tapToDismiss: false,
    timeOut: 5000,
    newestOnTop: false,
  };

  constructor(@Inject(Injector) private injector: Injector) {}

  showWrapper(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast<any> {
    this.toast.toastrConfig.newestOnTop = false;
    this.toast.toastrConfig.maxOpened = 5;
    this.toast.toastrConfig.autoDismiss = true;
    return this.toast.show(message, title, override, type);
  }

  public showError(message: string) {
    const toast = this.showWrapper(null, null, this.config);
    toast.toastRef.componentInstance.data = new NotificationData('error', message, NotificationType.ERROR);
  }

  public showHttpResponseErrorFor(err: Error) {
    if (!(err instanceof HttpErrorResponse)) {
      throw err;
    }

    const toast = this.showWrapper(null, null, { ...this.config, timeOut: 0 });

    const errMessage = typeof err?.error === 'string' ? JSON.parse(err?.error)?.message : err?.error.message;
    toast.toastRef.componentInstance.data = new NotificationData('error', errMessage, NotificationType.ERROR, err.headers.get('trace-id'));
  }

  public showInfo(message: string) {
    const toast = this.showWrapper(null, null, this.config);
    toast.toastRef.componentInstance.data = new NotificationData('info', message, NotificationType.INFO);
  }

  public showWarning(message: string) {
    const toast = this.showWrapper(null, null, this.config);
    toast.toastRef.componentInstance.data = new NotificationData('warning', message, NotificationType.WARNING);
  }

  public showComponent<T>(component: ComponentType<any>, data: any): ActiveToast<T> {
    const toast = this.showWrapper(null, null, { ...this.config, toastComponent: component, timeOut: 0 });
    toast.toastRef.componentInstance.data = data;
    return toast;
  }

  public show({ message, title, type, timeout }:
                {
                  message: string,
                  title: string,
                  type: NotificationType
                  timeout?: number
                }) {
    const toast = this.showWrapper(null, null, { ...this.config, timeOut: timeout ?? this.config.timeOut });
    toast.toastRef.componentInstance.data = new NotificationData(title, message, type);
  }


  private get toast(): ToastrService {
    return this.injector.get(ToastrService);
  }
}
