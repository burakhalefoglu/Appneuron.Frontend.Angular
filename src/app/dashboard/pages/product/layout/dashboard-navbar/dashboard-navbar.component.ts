import {Component, OnInit} from '@angular/core';
import {faBarChart, faGears, faBook, faRightFromBracket, faHome} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '@auth/services/auth.service';

@Component({
    selector: 'app-dashboard-navbar',
    templateUrl: './dashboard-navbar.component.html',
    styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {
    faBarChart = faBarChart;
    faGears = faGears;
    faBook = faBook;
    faRightFromBracket = faRightFromBracket;
    faHome = faHome;

    constructor(public authService: AuthService,
    ) {
    }

    ngOnInit() {
    }

}
