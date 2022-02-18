import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ForgotComponent } from '@auth/forgot/forgot.component';
import { LoginComponent } from '@auth/login/login.component';
import { LogoutComponent } from '@auth/logout/logout.component';
import { RegisterComponent } from '@auth/register/register.component';
import { ResetComponent } from '@auth/reset/reset.component';
import { UpdatePasswordComponent } from '@auth/update-password/update-password.component';

const routes: Routes = [
  {
    path: 'account/login',
    component: LoginComponent,
  },
  {
    path: 'account',
    component: LoginComponent,
  },
  {
    path: 'account/forgot',
    component: ForgotComponent,
  },
  {
    path: 'account/reset',
    component: ResetComponent,
  },
  {
    path: 'account/register',
    component: RegisterComponent,
  },
  {
    path: 'account/logout',
    component: LogoutComponent,
  },
  {
    path: 'account/updatepassword',
    component: UpdatePasswordComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
