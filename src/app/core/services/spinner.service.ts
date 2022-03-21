import { Injectable } from '@angular/core';
import {EventsService} from '@core/services/angular-event-service/angular-events.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private events: EventsService) {}
    public showSpinner(): void{
        this.events.publish('getSpinnerEvent', true);

    }

    public hideSpinner(): void{
        this.events.publish('getSpinnerEvent', false);
    }
}
