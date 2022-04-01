import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CoreService} from '@core/services/core.service';

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements AfterViewInit {
    constructor(private coreService: CoreService,
    ) {
    }

    selectedDate = new Date();
    ngAfterViewInit(): void {
    }

    onDateChange(e: Date): void {
        console.log(e);
    }
}
