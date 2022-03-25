import {Injectable} from '@angular/core';
import { CookieService } from 'ngx-cookie';

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
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
    }

    getItem(key: string): string {
        return this.cookieService.get(key);
    }
}
