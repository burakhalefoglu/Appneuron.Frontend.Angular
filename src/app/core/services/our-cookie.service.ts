import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';

@Injectable({
    providedIn: 'root'
})
export class OurCookieService {

    constructor(private cookieService: CookieService) {
    }

    removeItem(key: string): void {
        this.cookieService.remove(key);
    }

    setItem(key: string, data: any): void {
        this.cookieService.put(key, data, {
            secure: true,
            sameSite: 'strict'
        });
    }

    setToken(data: any): void {
        this.cookieService.put('jwt', data, {
            secure: true,
            sameSite: 'strict',
            httpOnly: true
        });
    }

    getItem(key: string): any {
        return this.cookieService.get(key);
    }
}
