import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AccountRoutingModule } from '@auth/account-routing.module';
import { RegisterComponent } from '@auth/register/register.component';
import { ResetComponent } from '@auth/reset/reset.component';
import { ForgotComponent } from '@auth/forgot/forgot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from '@auth/logout/logout.component';
import { ProfileComponent } from '@auth/profile/profile.component';
import { UpdatePasswordComponent } from '@auth/update-password/update-password.component';
import { AuthService } from '@app/core/components/auth/services/auth.service';
import { LoginComponent } from '@auth/login/login.component';
import { PasswordStrengthBarComponent } from '@auth/password-strength-bar/password-strength-bar.component';
@NgModule({
  declarations: [
    RegisterComponent,
    ResetComponent,
    ForgotComponent,
    LogoutComponent,
    ProfileComponent,
    UpdatePasswordComponent,
    LoginComponent,
    PasswordStrengthBarComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AccountRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthService
  ],
})
export class AccountModule { }
