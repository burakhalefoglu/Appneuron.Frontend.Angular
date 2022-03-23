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
    projectId: string;

    graphLink: string;
    remoteLink: string;

    constructor(public authService: AuthService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                    this.projectId = params.projectId;
                }
            );
        this.graphLink = '/dashboard/products/cp/graph' + '?projectId=' + this.projectId;
        this.remoteLink = '/dashboard/products/cp/remote' + '?projectId=' + this.projectId;
    }

}
