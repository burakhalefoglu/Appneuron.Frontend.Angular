import {Component, OnInit} from '@angular/core';

declare let $: any;

@Component({
    selector: 'app-ip-checker',
    templateUrl: './ip-checker.component.html',
    styleUrls: ['./ip-checker.component.scss']
})
export class IpCheckerComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
        this.getIPAddress();
    }

    getIPAddress(): void {
        $.getJSON('https://api.db-ip.com/v2/free/self', (data: any) => {
            console.log(JSON.stringify(data, null, 2));
        });
    }

}
