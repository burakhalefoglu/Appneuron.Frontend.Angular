import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoreService} from '@app/core/services/core.service';
import {OfferModel} from '@app/dashboard/pages/product/cp-remote/models/offer-model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ChurnPredictionGraphService} from '../../services/churn-prediction-graph.service';

@Component({
    selector: 'app-offer-strategy-effectiveness-analysis',
    templateUrl: './offer-strategy-effectiveness-analysis.component.html',
    styleUrls: ['./offer-strategy-effectiveness-analysis.component.scss'],
})
export class OfferStrategyEffectivenessAnalysisComponent implements OnInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    @Input() offerStrategyPercent: number;
    FailPercent: number;
    offerStrategies: Array<OfferModel> = new Array<OfferModel>();
    selectedStrategy: string;
    projectID: any;

    constructor(
        private churnPredictionApiService: ChurnPredictionGraphService,
        private route: ActivatedRoute,
        public coreService: CoreService
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
