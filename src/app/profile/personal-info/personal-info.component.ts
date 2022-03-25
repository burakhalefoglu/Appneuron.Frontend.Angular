import {Component, OnInit} from '@angular/core';
import {User} from '@app/profile/models/user';
import {FormControl} from '@angular/forms';
import {AuthService} from '@auth/services/auth.service';
import {UpdatePassword} from '@app/profile/models/update-password';
import {OurCookieService} from '@core/services/our-cookie.service';

@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

    public user: User;
    public updatePassword: UpdatePassword;

    name = new FormControl('');
    email = new FormControl('');
    validPassword = new FormControl('');
    password = new FormControl('');

    constructor(public ourCookieService: OurCookieService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.user = new User();
        this.updatePassword = new UpdatePassword();

        this.user.name =  this.ourCookieService.getItem('name');
        this.user.email =  this.ourCookieService.getItem('email');
    }

    public setUsername(): void {
        this.user.name = this.name.value;
        this.authService.changeUsernameOrEmail(this.user);
    }

    public setEmail(): void {
        this.user.name = this.email.value;
        this.authService.changeUsernameOrEmail(this.user);
    }

    public setPassword(): void {
        this.updatePassword.password = this.password.value;
        this.updatePassword.validPassword = this.validPassword.value;
        this.authService.changePassword(this.updatePassword);
    }

}
