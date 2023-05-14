import {Component, Input} from '@angular/core';
import {Toast, ToastPackage, ToastrService} from 'ngx-toastr';

export class NotificationData {
  traceId?: string;
  type: NotificationType;
  message: string;
  title: string;

  constructor(title: string, message: string, type: NotificationType, traceId?: string) {
    this.traceId = traceId;
    this.title = title;
    this.message = message;
    this.type = type;
  }
}

export enum NotificationType {
  INFO = 'info', WARNING = 'warning', ERROR = 'error_outline', CUSTOM = 'custom', WARNING_BLUE = 'warning_blue'
}

@Component({
  templateUrl: './notification-body.component.html',
  styleUrls: ['./notification-body.component.scss'],
})
export class NotificationBodyComponent extends Toast {

  @Input() data: NotificationData;

  constructor(
    protected toast: ToastrService,
    // @ts-ignore
    public toastPackage: ToastPackage,
  ) {
    super(toast, toastPackage);
  }

  close() {
    this.toast.clear(this.toastPackage.toastId);
  }
}
