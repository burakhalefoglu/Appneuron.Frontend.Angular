import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InterstitialAdDtoModel} from '@app/dashboard/pages/product/cp-remote/models/interstiel-ad-model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ChurnPredictionGraphService} from '../../services/churn-prediction-graph.service';

@Component({
    selector: 'app-advertising-strategy-display-rate',
    templateUrl: './advertising-strategy-display-rate.component.html',
    styleUrls: ['./advertising-strategy-display-rate.component.scss'],
})
export class AdvertisingStrategyDisplayRateComponent implements OnInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    @Input() advStrategyPercent: number;
    type = 'success';
    advStrategies: Array<InterstitialAdDtoModel> = new Array<InterstitialAdDtoModel>();
    selectedStrategy: string;

    projectID: any;

    constructor(
        private churnPredictionApiService: ChurnPredictionGraphService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((params) => {
                this.projectID = params.id;
            });
    }
}

