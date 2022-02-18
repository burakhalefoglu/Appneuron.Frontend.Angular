import { Component, OnInit } from '@angular/core';
import { CustomerInformationService } from '@app/core/services/customer-information.service';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { EventsService } from '@app/core/services/angular-event-service/angular-events.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  selectedTimer = 1;
  selectedMessage: string | undefined;
  timerSubscription!: Subscription;

  constructor(
    private events: EventsService,
    private localStorageService: LocalStorageService,
    private customerInformationService: CustomerInformationService
  ) {}

  selectTimer($event: any) {
    this.selectedTimer = Number($event.target.value);
    this.localStorageService.setItem('timer', this.selectedTimer);
    this.setUnsubscribeTimer();
    this.setObserverTimer(this.selectedTimer);

    if (this.selectedTimer === 1) {
      this.selectedMessage = this.selectedTimer + ' Minute';
      return;
    }
    this.selectedMessage = this.selectedTimer + ' Minutes';
  }

  ngOnInit(): void {
    this.setObserverTimer(this.selectedTimer);
    this.events.publish('timeToGetData');
    this.customerInformationService.showInfo(
      'Necessary requests have been made. When the data is ready,' +
        ' it will be reflected in the graphs.'
    );

    const timer = this.localStorageService.getItem('timer');
    if (timer == null) {
      this.selectedMessage = '1 Minute';
      return;
    }

    if (Number(timer) === 1) {
      this.selectedMessage = timer + ' Minute';
      return;
    }
    this.selectedMessage = timer + ' Minutes';
  }

  setObserverTimer(timer: number) {
    const minutesTimer = timer * 60000;
    this.timerSubscription = interval(minutesTimer).subscribe(() => {
      this.events.publish('timeToGetData');
      this.customerInformationService.showInfo(
        'Necessary requests have been made. When the data is ready,' +
          ' it will be reflected in the graphs.'
      );
    });
  }

  setUnsubscribeTimer() {
    this.timerSubscription.unsubscribe();
  }
}
