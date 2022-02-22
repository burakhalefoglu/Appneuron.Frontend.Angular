import {LocalStorageService} from '@app/core/services/local-storage.service';
import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {EventsService} from '@app/core/services/angular-event-service/angular-events.service';
import {TimeFilterDate} from '@app/dashboard/models/time-filter-date-model';
import {ConfigModel} from '@app/dashboard/models/config-model';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
    selectedDate: any;
    destroy$: Subject<boolean> = new Subject<boolean>();

    homeLink =
        'customerdashboard/customerprojects/game/product/overview/home?id=';
    summaryLink =
        'customerdashboard/customerprojects/game/product/overview/summary?id=';

    difficultyAnalysisGraphLink =
        'customerdashboard/customerprojects/game/product/churnblocker/difficultyanalysis?id=';
    levelAnalysisLink =
        'customerdashboard/customerprojects/game/product/churnblocker/levelanalysis?id=';
    regressionAnalysisLink =
        'customerdashboard/customerprojects/game/product/churnblocker/regressionanalysis?id=';

    PredictionGraphs =
        'customerdashboard/customerprojects/game/product/churnprediction/PredictionGraphs?id=';

    RemoteSettings =
        'customerdashboard/customerprojects/game/product/churnprediction/RemoteSettings?id=';

    PushNotification =
        'customerdashboard/customerprojects/game/product/churnprediction/PushNotification?id=';

    projectId = '';

    constructor(
        private events: EventsService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private localStorageService: LocalStorageService
    ) {
    }

    ngOnInit(): void {

        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((params) => {
                this.projectId = params.id;
                this.homeLink = this.homeLink + this.projectId;
                this.summaryLink = this.summaryLink + this.projectId;

                this.difficultyAnalysisGraphLink =
                    this.difficultyAnalysisGraphLink + this.projectId;
                this.levelAnalysisLink = this.levelAnalysisLink + this.projectId;
                this.regressionAnalysisLink =
                    this.regressionAnalysisLink + this.projectId;

                this.PredictionGraphs = this.PredictionGraphs + this.projectId;

                this.RemoteSettings = this.RemoteSettings + this.projectId;

                this.PushNotification = this.PushNotification + this.projectId;
            });
    }

    datesUpdated(range: any): void {
        const timeFilterDate = new TimeFilterDate();
        if (Object.keys(timeFilterDate).length === 0) {
            timeFilterDate.startDate = Date.now();
            timeFilterDate.endDate = Date.now();
            this.events.publish('filterTime', timeFilterDate);
            return;
        }
        timeFilterDate.startDate = Number(range.startDate._d);
        timeFilterDate.endDate = Number(range.endDate._d);
        this.events.publish('filterTime', timeFilterDate);
    }

    downloadJson() {
        const configModel = new ConfigModel();
        configModel.CustomerId = BigInt(this.localStorageService
            .getItem('DashboardKey'));
        configModel.ProjectId = BigInt(this.projectId);
        const sJson = JSON.stringify(configModel);
        const element = document.createElement('a');
        element.setAttribute(
            'href',
            'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson)
        );
        element.setAttribute('download', 'ChurnBlocker.json');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click(); // simulate click
        document.body.removeChild(element);
    }
}
