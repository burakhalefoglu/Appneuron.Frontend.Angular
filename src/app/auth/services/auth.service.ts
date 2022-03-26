import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {environment} from '@environments/environment';
import {MessageModel, TokenDataModel} from '../models/response-model';
import {ForgotModel} from '../models/forgot-model';
import {UpdatePasswordModel} from '../models/update-password-model';
import {ResetModel} from '../models/reset-model';
import {AuthModel} from '@auth/models/register-model';
import {User} from '@app/profile/models/user';
import {UpdatePassword} from '@app/profile/models/update-password';
import {SpinnerService} from '@core/services/spinner.service';
import {finalize, tap} from 'rxjs/operators';
import {OurCookieService} from '@core/services/our-cookie.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    decodedToken: any;
    jwtHelper: JwtHelperService = new JwtHelperService();
    claims: string[] = [];

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private customerInformationService: CustomerInformationService,
        private ourCookieService: OurCookieService,
        private spinnerService: SpinnerService,
    ) {
    }

    loginOrRegister(authModel: AuthModel): void {
        this.spinnerService.showSpinner();
        this.httpClient
            .post<TokenDataModel>(
                environment.getAuthApiUrl + '/Auth/loginorregister',
                authModel
            ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        ).subscribe((data) => {

            if (data.success) {
                this.customerInformationService.showSuccess(data.message);
                this.tokenFieldWork(data);
                this.router.navigateByUrl('/dashboard');
                return;
            }
            this.customerInformationService.showError(data.message);
        });
    }

    changeUsernameOrEmail(user: User): void {
        this.spinnerService.showSpinner();
        this.httpClient
            .post<TokenDataModel>(
                environment.getAuthApiUrl + '/Users',
                user
            ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        )
            .subscribe((data) => {
                if (data.success) {
                    console.log(data);
                    this.customerInformationService.showSuccess(data.message);
                    this.tokenFieldWork(data);
                    this.router.navigateByUrl('/profile');
                    return;
                }
                this.customerInformationService.showError(data.message);
            });
    }

    changePassword(updatePassword: UpdatePassword): void {
        this.spinnerService.showSpinner();
        this.httpClient
            .post<TokenDataModel>(
                environment.getAuthApiUrl + '/Auth/changeuserpassword',
                updatePassword
            ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        )
            .subscribe((data) => {
                if (data.success) {
                    console.log(data);
                    this.customerInformationService.showSuccess(data.message);
                    this.tokenFieldWork(data);
                    this.router.navigateByUrl('/profile');
                    return;
                }
                this.customerInformationService.showError(data.message);
            });
    }


    private tokenFieldWork(data: TokenDataModel): void {
        this.claims = data.data.claims;
        const token = data.data.token;
        this.ourCookieService.setItem('expiration', data.data.expiration);

        const decode = this.jwtHelper.decodeToken(token);
        const UserId = Object.keys(decode).filter((x) =>
            x.endsWith('/nameidentifier')
        )[0];
        this.ourCookieService.setItem('userId', decode[UserId]);

        const propUserName = Object.keys(decode).filter((x) =>
            x.endsWith('/name')
        )[0];
        this.ourCookieService.setItem('name', decode[propUserName]);

        const propEmail = Object.keys(decode).filter((x) =>
            x.endsWith('/emailaddress')
        )[0];
        this.ourCookieService.setItem('email', decode[propEmail]);
    }

    forgot(forgotModel: ForgotModel): void {
        this.spinnerService.showSpinner();
        this.httpClient
            .put<MessageModel>(
                environment.getAuthApiUrl + '/Auth/forgotpassword',
                forgotModel
            ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        )
            .subscribe((data) => {

                if (data.success) {
                    this.customerInformationService.showSuccess(data.message);
                } else {
                    this.customerInformationService.showError(data.message);
                }
            });
    }

    update(updatePasswordModel: UpdatePasswordModel): void {
        this.spinnerService.showSpinner();
        this.httpClient
            .put<MessageModel>(
                environment.getAuthApiUrl + '/Auth/changeuserpassword',
                updatePasswordModel
            ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        )
            .subscribe((data) => {
                if (data.success) {
                    this.customerInformationService.showSuccess(data.message);
                } else {
                    this.customerInformationService.showError(data.message);
                }
            });
    }

    reset(resetModel: ResetModel, token: string): void {
        this.spinnerService.showSpinner();
        this.httpClient
            .post<TokenDataModel>(
                environment.getAuthApiUrl + '/Auth/resetpassword?token=' + token,
                resetModel
            ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        )
            .subscribe((data) => {
                if (data.success) {
                    this.customerInformationService.showSuccess(data.message);
                    return;
                }

                this.customerInformationService.showError(data.message);
            });
    }

    logOut(): void {
        this.ourCookieService.removeItem('lang');
        this.ourCookieService.setItem('expiration', new Date(-8640000000000000));
        this.claims = [];
        this.router.navigate(['/']);
    }

    getCurrentUserId(): void {
        return this.jwtHelper.decodeToken(
            this.ourCookieService.getItem('token')?.toString()
        ).userId;
    }

    claimGuard(claim: string): boolean {
        const check = this.claims.some((item): boolean => {
            return item === claim;
        });

        return check;
    }
}
