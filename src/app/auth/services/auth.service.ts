import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NgxSpinnerService} from 'ngx-spinner';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {LocalStorageService} from '@core/services/local-storage.service';
import {environment} from '@environments/environment';
import {EventsService} from '@app/core/services/angular-event-service/angular-events.service';
import {MessageModel, TokenDataModel} from '../models/response-model';
import {ForgotModel} from '../models/forgot-model';
import {UpdatePasswordModel} from '../models/update-password-model';
import {ResetModel} from '../models/reset-model';
import {LoginModel} from '@app/auth/models/login-model';
import {AuthModel} from '@auth/models/register-model';
import {User} from '@app/profile/models/user';
import {UpdatePassword} from '@app/profile/models/update-password';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
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
    ) {
    }

    loginOrRegister(authModel: AuthModel): void {
        this.spinner.show();
        this.events.publish('SpinnerMessage', 'Membership begins...');

        this.httpClient
            .post<TokenDataModel>(
                environment.getAuthApiUrl + '/Auth/loginorregister',
                authModel
            )
            .subscribe((data) => {
                this.spinner.hide();
                if (data.success) {
                    console.log(data);
                    this.customerInformationService.showSuccess(data.message);

                    this.tokenFieldWork(data);

                    this.router.navigateByUrl('/dashboard');
                    return;
                }
                this.customerInformationService.showError(data.message);
                this.spinner.hide();
            });
    }

    changeUsernameOrEmail(user: User): void {
        this.spinner.show();
        this.events.publish('SpinnerMessage', 'Membership begins...');

        this.httpClient
            .post<TokenDataModel>(
                environment.getAuthApiUrl + '/Users',
                user
            )
            .subscribe((data) => {
                this.spinner.hide();
                if (data.success) {
                    console.log(data);
                    this.customerInformationService.showSuccess(data.message);
                    this.tokenFieldWork(data);
                    this.router.navigateByUrl('/profile');
                    return;
                }
                this.customerInformationService.showError(data.message);
                this.spinner.hide();
            });
    }

    changePassword(updatePassword: UpdatePassword): void {
        this.spinner.show();
        this.events.publish('SpinnerMessage', 'Membership begins...');

        this.httpClient
            .post<TokenDataModel>(
                environment.getAuthApiUrl + '/Auth/changeuserpassword',
                updatePassword
            )
            .subscribe((data) => {
                this.spinner.hide();
                if (data.success) {
                    console.log(data);
                    this.customerInformationService.showSuccess(data.message);
                    this.tokenFieldWork(data);
                    this.router.navigateByUrl('/profile');
                    return;
                }
                this.customerInformationService.showError(data.message);
                this.spinner.hide();
            });
    }


    private tokenFieldWork(data: TokenDataModel) {
        this.storageService.setItem('token', data.data.token);
        this.claims = data.data.claims;
        const token = data.data.token;
        const decode = this.jwtHelper.decodeToken(token);

        const UserId = Object.keys(decode).filter((x) =>
            x.endsWith('/nameidentifier')
        )[0];
        this.storageService.setItem('userId', UserId);

        const propUserName = Object.keys(decode).filter((x) =>
            x.endsWith('/name')
        )[0];
        this.storageService.setItem('name', propUserName);

        const propEmail = Object.keys(decode).filter((x) =>
            x.endsWith('/emailaddress')
        )[0];
        this.storageService.setItem('email', propEmail);
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

    logOut(): void {
        this.storageService.removeItem('token');
        this.storageService.removeItem('lang');
        this.claims = [];
        this.router.navigate(['/']);
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
