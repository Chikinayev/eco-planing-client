import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainGuard} from "./main.guard";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ProfileComponent} from "./pages/profile/profile.component";

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
