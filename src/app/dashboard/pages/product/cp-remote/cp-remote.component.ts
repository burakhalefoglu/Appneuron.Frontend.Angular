import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomerInformationService} from '@app/core/services/customer-information.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ChurnDateModel} from '@app/dashboard/pages/product/cp-remote/models/churn-date-model';
import {ChurnPredictionGraphService} from '../services/churn-prediction-graph.service';
import {RemoteSettingsService} from '@app/dashboard/pages/product/services/remote-settings.service';

@Component({
    selector: 'app-cp-remote',
    templateUrl: './cp-remote.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./cp-remote.component.scss'],
})
export class CpRemoteComponent implements OnInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    isAdvPageActive = false;
    selectedName = 'Offer Strategy';
    timeout: any = null;
    projectId: number;

    constructor(
        private churnPredictionApiService: RemoteSettingsService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((params) => {
                this.projectId = params.id;
            });
        this.isAdvPageActive = this.isAdvPageActiveValueFromLocalStorage();
    }

    advClickEvent(): void {
        this.isAdvPageActive = true;
        this.selectedName = 'Adv Strategy';
        localStorage.setItem('isAdvPageActive', 'active');
    }

    offerClickEvent(): void {
        this.isAdvPageActive = false;
        this.selectedName = 'Offer Strategy';
        localStorage.setItem('isAdvPageActive', 'deactive');
    }

    isAdvPageActiveValueFromLocalStorage(): boolean {
        const isAdvPageActiveValue = localStorage.getItem('isAdvPageActive');
        if (isAdvPageActiveValue === 'deactive') {
            this.selectedName = 'Offer Strategy';
            return false;
        }
        this.selectedName = 'Adv Strategy';
        return true;
    }

    sendStrategy(): void {
        if (this.isAdvPageActive) {
            this.churnPredictionApiService.sendAdvStrategies(this.projectId);
            return;
        }
        this.churnPredictionApiService.sendOfferStrategies(this.projectId);
    }
}

