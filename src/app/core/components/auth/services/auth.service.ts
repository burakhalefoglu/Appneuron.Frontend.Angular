import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerInformationService } from '@core/services/customer-information.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { environment } from '@environments/environment';
import { LoginModel } from '@app/core/components/auth/models/login-model';
import { EventsService } from '@app/core/services/angular-event-service/angular-events.service';
import { RegisterModel } from '../models/register-model';
import { MessageModel, TokenDataModel } from '../models/response-model';
import { ForgotModel } from '../models/forgot-model';
import { UpdatePasswordModel } from '../models/update-password-model';
import { ResetModel } from '../models/reset-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userName!: string;
  isLoggin = false;
  decodedToken: any;
  userToken!: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  claims: string[] = [];

  constructor(
    private events: EventsService,
    private httpClient: HttpClient,
    private router: Router,
    private customerInformationService: CustomerInformationService,
    private spinner: NgxSpinnerService,
    private storageService: LocalStorageService
  ) {}

  register(registerModel: RegisterModel): void {
    this.spinner.show();
    this.events.publish('SpinnerMessage', 'Membership begins...');

    this.httpClient
      .post<TokenDataModel>(
        environment.getAuthApiUrl + '/Auth/register',
        registerModel
      )
      .subscribe((data) => {
        this.spinner.hide();
        if (data.success) {
          console.log(data);
          this.customerInformationService.showSuccess(data.message);
          this.storageService.setItem('token', data.data.token);
          this.claims = data.data.claims;

          const token = this.storageService.getItem('token');
          const decode = this.jwtHelper.decodeToken(token!);
          const UserId = Object.keys(decode).filter((x) =>
            x.endsWith('/nameidentifier')
          )[0];
          this.storageService.setItem('userId', UserId);

          const propUserName = Object.keys(decode).filter((x) =>
            x.endsWith('/name')
          )[0];
          this.userName = decode[propUserName];
          this.router.navigateByUrl('/customerdashboard');
          return;
        }
        this.customerInformationService.showError(data.message);
        this.spinner.hide();
      });
  }

  login(loginUser: LoginModel): void {
    this.spinner.show();
    this.events.publish('SpinnerMessage', 'logging in...');
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    this.httpClient
      .post<TokenDataModel>(
        environment.getAuthApiUrl + '/Auth/login',
        loginUser,
        { headers }
      )
      .subscribe((data) => {
        if (data.success) {
          this.customerInformationService.showSuccess(data.message);
          this.storageService.setItem('token', data.data.token);
          this.claims = data.data.claims;
          this.spinner.hide();
          const token = this.storageService.getItem('token');
          const decode = this.jwtHelper.decodeToken(token!);

          const UserIdKey = Object.keys(decode).filter((x) =>
            x.endsWith('/nameidentifier')
          )[0];
          const userId = decode[UserIdKey];
          this.storageService.setItem('userId', userId);

          const propUserName = Object.keys(decode).filter((x) =>
            x.endsWith('/name')
          )[0];
          this.userName = decode[propUserName];
          this.router.navigateByUrl('/customerdashboard');
          return;
        }
        this.spinner.hide();
        this.customerInformationService.showError(data.message);
      });
  }

  forgot(forgotModel: ForgotModel): void {
    this.spinner.show();
    this.events.publish('SpinnerMessage', 'Sending reset link...');

    this.httpClient
      .put<MessageModel>(
        environment.getAuthApiUrl + '/Auth/forgotpassword',
        forgotModel
      )
      .subscribe((data) => {
        this.spinner.hide();

        if (data.success) {
          this.customerInformationService.showSuccess(data.message);
        } else {
          this.customerInformationService.showError(data.message);
          this.spinner.hide();
        }
      });
  }

  update(updatePasswordModel: UpdatePasswordModel): void {
    this.spinner.show();
    this.events.publish('SpinnerMessage', 'Profile updating...');
    this.httpClient
      .put<MessageModel>(
        environment.getAuthApiUrl + '/Auth/changeuserpassword',
        updatePasswordModel
      )
      .subscribe((data) => {
        this.spinner.hide();
        if (data.success) {
          this.customerInformationService.showSuccess(data.message);
        } else {
          this.customerInformationService.showError(data.message);
          this.spinner.hide();
        }
      });
  }

  reset(resetModel: ResetModel, token: string): void {
    this.spinner.show();
    this.events.publish('SpinnerMessage', 'Password reset...');
    this.httpClient
      .post<TokenDataModel>(
        environment.getAuthApiUrl + '/Auth/resetpassword?token=' + token,
        resetModel
      )
      .subscribe((data) => {
        this.spinner.hide();
        if (data.success) {
          this.customerInformationService.showSuccess(data.message);
          return;
        }

        this.customerInformationService.showError(data.message);
        this.spinner.hide();
      });
  }

  getUserName(): string {
    return this.userName;
  }

  // setClaims() {

  //   if ((this.claims == undefined || this.claims.length == 0) && this.customCookieService.readTokenOnCookie() != null && this.loggedIn()) {

  //     this.httpClient.get<string[]>(environment.getAuthApiUrl  + "/OperationClaims/getuserclaimsfromcache").subscribe(data => {
  //       this.claims = data;
  //     })

  //     var token = this.customCookieService.readTokenOnCookie();
  //     var decode = this.jwtHelper.decodeToken(token!);

  //     var propUserName = Object.keys(decode).filter(x => x.endsWith("/name"))[0];
  //     this.userName = decode[propUserName];
  //   }
  // }

  logOut(): void {
    this.storageService.removeItem('token');
    this.storageService.removeItem('lang');
    this.claims = [];
    this.router.navigate(['/account/login']);
  }

  loggedIn(): boolean {
    const isExpired = this.jwtHelper.isTokenExpired(
      this.storageService.getItem('token')?.toString()
    );
    return !isExpired;
  }

  getCurrentUserId(): void {
    return this.jwtHelper.decodeToken(
      this.storageService.getItem('token')?.toString()
    ).userId;
  }

  claimGuard(claim: string): boolean {
    const check = this.claims.some((item): boolean => {
      return item === claim;
    });

    return check;
  }
}
