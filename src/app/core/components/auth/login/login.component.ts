import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '@app/core/components/auth/models/login-model';
import { LoginRegisterResModel } from '@app/core/components/auth/models/login-register-res-model';
import { AuthService } from '@app/core/components/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})
export class LoginComponent implements OnInit {
  loginFormInfo!: FormGroup;
  loginFormObject: LoginModel = new LoginModel();
  loginRegisterResModel: LoginRegisterResModel = new LoginRegisterResModel();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  LoginFormEvent(): void {
    this.loginFormInfo = this.formBuilder.group({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required]),
    });
  }

  add(): void {
    this.loginFormObject = Object.assign({}, this.loginFormInfo.value);
    this.authService.login(this.loginFormObject);
  }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/customerdashboard']);
    }

    this.LoginFormEvent();
  }
}
