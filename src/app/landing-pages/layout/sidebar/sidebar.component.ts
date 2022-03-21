import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.recallJsFuntions();
    }

    recallJsFuntions(): void {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    document.getElementById('closeModalButton').click();
                }
            });
    }

    ngOnDestroy(): void {
    }
}
