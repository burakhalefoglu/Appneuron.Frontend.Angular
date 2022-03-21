import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationStart, NavigationCancel, NavigationEnd} from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {filter} from 'rxjs/operators';
import {AuthService} from '@auth/services/auth.service';
import {CoreService} from '@core/services/core.service';

declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit, OnDestroy {
    location: any;
    routerSubscription: any;

    constructor(private router: Router, private coreService: CoreService) {
    }

    ngOnInit(): void {
        this.recallJsFuntions();
    }

    recallJsFuntions(): void {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                }
            });
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
            .subscribe(event => {
                this.location = this.router.url;
            });
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
}
