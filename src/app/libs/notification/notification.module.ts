import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationBodyComponent} from './notification-body.component';
import {NotificationService} from './notification.service';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [NotificationBodyComponent],
  imports: [CommonModule, TranslateModule, MatIconModule, ClipboardModule],
  providers: [NotificationService],
})
export class NotificationModule {}
