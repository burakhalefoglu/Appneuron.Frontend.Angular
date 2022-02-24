import {Component, OnInit} from '@angular/core';
import {faBarChart, faGears, faBook} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-dashboard-navbar',
    templateUrl: './dashboard-navbar.component.html',
    styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {
    faBarChart = faBarChart;
    faGears = faGears;
    faBook = faBook;
    constructor() {
    }

    ngOnInit() {
    }

}
