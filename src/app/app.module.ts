import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./pages/auth/login/login.component";
import {FormsModule} from "@angular/forms";
import {LoginModule} from "./pages/auth/login/login.module";
import { RegistrationComponent } from './pages/registration/registration.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import {NgOptimizedImage} from "@angular/common";
import { ProfileComponent } from './pages/profile/profile.component';
import { FooterComponent } from './pages/footer/footer.component';
import { MenuComponent } from './pages/menu/menu.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { MainComponent } from './pages/main/main.component';
import { EventComponent } from './pages/event/event.component';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { EventInfoComponent } from './pages/event-info/event-info.component';
import { EventAddFormComponent } from './pages/event-add-form/event-add-form.component';
import { OrganizatorProfileComponent } from './pages/organizator-profile/organizator-profile.component';
import { AboutComponent } from './pages/about/about.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatPaginatorModule} from "@angular/material/paginator";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    FooterComponent,
    MenuComponent,
    SidebarComponent,
    MainComponent,
    EventComponent,
    OrganizationsComponent,
    EventInfoComponent,
    EventAddFormComponent,
    OrganizatorProfileComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LoginModule,
    NgOptimizedImage,
    NgxPaginationModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
