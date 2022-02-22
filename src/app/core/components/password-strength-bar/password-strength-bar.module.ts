import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordStrengthBarComponent } from './password-strength-bar.component';



@NgModule({
  declarations: [PasswordStrengthBarComponent],
  exports: [PasswordStrengthBarComponent],
  bootstrap: [PasswordStrengthBarComponent],
  imports: [CommonModule],
})
export class PasswordStrengthBarModule { }
