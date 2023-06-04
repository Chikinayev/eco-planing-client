import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainGuard} from "./main.guard";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {MenuComponent} from "./pages/menu/menu.component";
import {MainComponent} from "./pages/main/main.component";
import {SidebarComponent} from "./pages/sidebar/sidebar.component";
import {EventComponent} from "./pages/event/event.component";
import {OrganizationsComponent} from "./pages/organizations/organizations.component";
import {EventInfoComponent} from "./pages/event-info/event-info.component";
import {EventAddFormComponent} from "./pages/event-add-form/event-add-form.component";

import {AboutComponent} from "./pages/about/about.component";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: ()=> import('./pages/auth/login/login-routing.module').then(m => m.LoginRoutingModule),
  },
  {
    path: 'menu',
    component : MenuComponent
  },
  {
    path: 'forgot-password',
    component : ForgotPasswordComponent
  },
  {
    path: 'register',
    component : RegistrationComponent
  },
  {
    path: 'profile',
    loadChildren: ()=> import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canLoad:[MainGuard]
  },
  {
    path: 'sidebar',
    component : SidebarComponent
  },
  {
    path: 'event',
    component : EventComponent
  },
  {
    path: 'main',
    loadChildren: ()=> import('./pages/main/main.module').then(m => m.MainModule),
    canLoad:[MainGuard]
  },

  {
    path: 'organizations',
    component : OrganizationsComponent
  },
  {
    path: 'event-info',
    component : EventInfoComponent
  },
  {
    path: 'event-add-form',
    component : EventAddFormComponent
  },
  {
    path: 'about',
    component : AboutComponent
  },

  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration:'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
