import {Injectable} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {JwtHelperService} from '@auth0/angular-jwt';
import {OurCookieService} from '@core/services/our-cookie.service';

@Injectable({
    providedIn: 'root',
})
export class CoreService {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private sanitizer: DomSanitizer,
                private ourCookieService: OurCookieService,
    ) {
    }

    public formatDateFromNumberDate(numbDate: number): string {
        const date = new Date(numbDate * 1000);
        const dateStr =
            ('00' + (date.getMonth() + 1)).slice(-2) +
            '/' +
            ('00' + date.getDate()).slice(-2) +
            '/' +
            date.getFullYear() +
            ' ' +
            ('00' + date.getHours()).slice(-2) +
            ':' +
            ('00' + date.getMinutes()).slice(-2) +
            ':' +
            ('00' + date.getSeconds()).slice(-2);
        return dateStr;
    }

    public calculatePercentTowNumber(firstNum: number, secontnum: number): number {
        return Math.floor(((firstNum - secontnum) * 100) / firstNum);
    }

    public calculateRatePercent(firstNum: number, secontnum: number): number {
        return Math.floor((secontnum * 100) / firstNum);
    }

    public str2img(str: string): SafeResourceUrl {
        return this.showImage(this.str2ab(str));
    }

    ab2str(buf): string {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }

    public str2ab(str): ArrayBuffer {
        const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    public showImage(buffer: ArrayBuffer): SafeResourceUrl {
        const arrayBufferView = new Uint8Array(buffer);
        const blob = new Blob([arrayBufferView], {type: 'image/jpeg'});
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        const image = this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
        return image;
    }

    public addHours(date, hours): Date {
        const newDate = new Date(date);
        newDate.setHours(newDate.getHours() + hours);
        return newDate;
    }

    public getDayNameOfWeek(date: Date = null): any {
        const weekdays = new Array(7);
        weekdays[0] = 'Sunday';
        weekdays[1] = 'Monday';
        weekdays[2] = 'Tuesday';
        weekdays[3] = 'Wednesday';
        weekdays[4] = 'Thursday';
        weekdays[5] = 'Friday';
        weekdays[6] = 'Saturday';
        if (date === null) {
            const d = new Date();
            return weekdays[d.getDay()];
        }
        return weekdays[date.getDay()];
    }

    public getMonthNameOfWeek(date: Date = null): any {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        if (date === null) {
            const d = new Date();
            return monthNames[d.getMonth()];
        }
        return monthNames[new Date(date).getMonth()];
    }

    public getDay(date: Date = null): any {
        if (date === null) {
            const d = new Date();
            return d.getDate();
        }
        return new Date(date).getDate();
    }

    public getFullYear(date: Date = null): any {
        if (date === null) {
            const d = new Date();
            return d.getFullYear();
        }
        return new Date(date).getFullYear();
    }

    public getLeftDay(createdAt: Date): number {
        const date = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.abs((date.getTime() - new Date(createdAt).getTime()) / (oneDay));
        return Math.floor(diffDays) + 1;
    }

    public loggedIn(): boolean {
        const date: Date = this.ourCookieService.getItem('expiration');
        const result = this.CompareDate(date, new Date());
        // const isNotValid = this.jwtHelper.isTokenExpired(
        //     // cache.get('token')
        // );
        return result === 1;
    }

    public CompareDate(DateA, DateB): number {
        const a = new Date(DateA);
        const b = new Date(DateB);

        const msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
        const msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());
        if (parseFloat(msDateA.toString()) < parseFloat(msDateB.toString())) {
            return -1;
        }// less than
        else if (parseFloat(msDateA.toString()) === parseFloat(msDateB.toString())) {
            return 0;
        }// equal
        else if (parseFloat(msDateA.toString()) > parseFloat(msDateB.toString())) {
            return 1;
        }// greater than
        else {
            return null;
        }  // error
    }

}
