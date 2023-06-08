import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {VERSION as CDK_VERSION} from '@angular/cdk';
import {VERSION as MAT_VERSION, MatNativeDateModule} from '@angular/material/core';


import { AppModule } from './app/app.module';
import {AdminComponent} from "./app/pages/admin/admin.component";
import {importProvidersFrom} from "@angular/core";
console.info('Angular CDK version', CDK_VERSION.full);
console.info('Angular Material version', MAT_VERSION.full);

bootstrapApplication(AdminComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule)
  ]
}).catch(err => console.error(err));


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
