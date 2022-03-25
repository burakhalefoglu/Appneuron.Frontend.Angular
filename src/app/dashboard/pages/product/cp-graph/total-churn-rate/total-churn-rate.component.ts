import {ActivatedRoute} from '@angular/router';
import {EventsService} from '@app/core/services/angular-event-service/angular-events.service';
import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {GenerateRandomService} from '@app/core/services/generate-random.service';
import {OurCookieService} from '@core/services/our-cookie.service';

@Component({
    selector: 'app-total-churn-rate',
    templateUrl: './total-churn-rate.component.html',
    styleUrls: ['./total-churn-rate.component.scss'],
})
export class TotalChurnRateComponent implements OnInit, OnDestroy {
    updateFromInput = false;
    eventsSubject: Subject<void> = new Subject<void>();

    title = 'Total Player Churn';
    type: any = 'line';
    dataType = 'Rate';
    yAxis = 'Count';
    dataName = 'Rate';
    xAxistitle = 'Date';

    data: [number, number][];

    destroy$: Subject<boolean> = new Subject<boolean>();
    projectID!: string;

    constructor(
        private ourCookieService: OurCookieService,
        private generateRandom: GenerateRandomService,
        private events: EventsService,
        private route: ActivatedRoute
    ) {
    }

    getTimeFormat(value: number): string {
        return (
            new Date(value).toLocaleDateString('en') +
            ' ' +
            new Date(value).toLocaleTimeString('en', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
            })
        );
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
