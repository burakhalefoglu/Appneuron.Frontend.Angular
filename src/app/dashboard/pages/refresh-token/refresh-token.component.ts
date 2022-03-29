import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@auth/services/auth.service';

@Component({
    selector: 'app-refresh-token',
    template: '',
    styles: ['']
})
export class RefreshTokenComponent implements OnInit, OnDestroy {
    interval: any;
    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.refreshToken();
        this.interval = setInterval(() => {
            this.authService.refreshToken();
        }, 20 * 1000);
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
    }
}


