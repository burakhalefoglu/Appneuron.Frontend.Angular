import {Injectable} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class CoreService {

    jwtHelper: JwtHelperService = new JwtHelperService();
    
    constructor(private sanitizer: DomSanitizer,
         private localStorageService: LocalStorageService) {
    }

    formatDateFromNumberDate(numbDate: number): string {
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

    calculatePercentTowNumber(firstNum: number, secontnum: number): number {
        return Math.floor(((firstNum - secontnum) * 100) / firstNum);
    }

    calculateRatePercent(firstNum: number, secontnum: number): number {
        return Math.floor((secontnum * 100) / firstNum);
    }

    str2img(str: string): SafeResourceUrl {
        return this.showImage(this.str2ab(str));
    }

    ab2str(buf): string {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }

    str2ab(str): ArrayBuffer {
        const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    showImage(buffer: ArrayBuffer): SafeResourceUrl {
        const arrayBufferView = new Uint8Array(buffer);
        const blob = new Blob([arrayBufferView], {type: 'image/jpeg'});
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        const image = this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
        return image;
    }

    addHours(date, hours): Date {
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
        return monthNames[date.getMonth()];
    }

    public getDay(): any {
        const d = new Date();
        return d.getDate();
    }

    public getLeftDay(createdAt: Date): number {
        const date = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.abs((date.getTime() - createdAt.getTime()) / (oneDay));
        return  Math.floor( diffDays );
    }

    loggedIn(): boolean {
        const isExpired = this.jwtHelper.isTokenExpired(
          this.localStorageService.getItem('token')?.toString()
        );
        return !isExpired;
      }
}
