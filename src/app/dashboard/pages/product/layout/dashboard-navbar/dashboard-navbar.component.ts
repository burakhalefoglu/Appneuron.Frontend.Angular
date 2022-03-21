import {Component, OnInit} from '@angular/core';
import {faBarChart, faGears, faBook, faRightFromBracket, faHome, faUser} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '@auth/services/auth.service';
import {ActivatedRoute} from '@angular/router';

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
    faUser = faUser;
    graphLink: string;
    projectName: string;
    remoteLink: string;

    constructor(public authService: AuthService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                    this.projectName = params.projectName;
                }
            );
        this.graphLink = '/dashboard/products/cp/graph' + '?projectName=' + this.projectName;
        this.remoteLink = '/dashboard/products/cp/remote' + '?projectName=' + this.projectName;
    }

}
