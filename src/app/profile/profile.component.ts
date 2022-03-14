import {Component, OnInit} from '@angular/core';
import {faUser, faCreditCard, faTv, faTasks, faCog, faChartPie} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public faUser = faUser;
    public faCreditCard = faCreditCard;
    public faTv = faTv;
    public faTasks = faTasks;
    public faCog = faCog;
    public selector: number;
    public faChartPie = faChartPie;

    constructor() {
    }

    ngOnInit(): void {
        this.selector = 1;
    }


    setSection(n: number) {
        this.selector = n;
    }
}
