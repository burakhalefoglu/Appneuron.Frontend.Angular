import {Component, OnInit} from '@angular/core';
import {EventsService} from '@core/services/angular-event-service/angular-events.service';
@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
    loading = false;

    constructor(private events: EventsService) {
    }

    ngOnInit(): void {
        this.events.subscribe('getSpinnerEvent', (isSpine: boolean) => {
           this.loading = isSpine;
        });
    }

}
