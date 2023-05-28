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
import {OrganizationsComponent} from "./pages/organizations/organizations.component";
import {EventInfoComponent} from "./pages/event-info/event-info.component";
import {EventAddFormComponent} from "./pages/event-add-form/event-add-form.component";

import {OrganizatorProfileComponent} from "./pages/organizator-profile/organizator-profile.component";

const routes: Routes = [
  {
    path: 'login',
    component : LoginComponent
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
    component : ProfileComponent
  },
  // {
  //   path: 'menu',
  //   component : MenuComponent
  // },
  {
    path: 'sidebar',
    component : SidebarComponent
  },
  {
    path: 'main',
    component : MainComponent
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
    path: 'organizator-profile',
    component: OrganizatorProfileComponent
  },
  {
    path: '',
    loadChildren: () => import('./main.guard').then(m => m.MainGuard),
    canLoad: [MainGuard],
  },{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
