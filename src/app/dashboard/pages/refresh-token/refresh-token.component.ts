import {Component, OnInit} from '@angular/core';
import {AuthService} from '@auth/services/auth.service';

@Component({
    selector: 'app-refresh-token',
    template: '',
    styles: ['']
})
export class RefreshTokenComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.authService.refreshToken();
        }, 30 * 1000);
    }
}
