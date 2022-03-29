import {Component, OnInit} from '@angular/core';
import {ChurnPredictionGraphService} from '@app/dashboard/pages/product/services/churn-prediction-graph.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-cp-graph',
    templateUrl: './cp-graph.component.html',
    styleUrls: ['./cp-graph.component.scss']
})
export class CpGraphComponent implements OnInit {

    churnPredictionResultRate: number;
    offerStrategyPercent: number;
    advStrategyPercent: number;
    projectId: string;

    constructor(private churnPredictionGraphService: ChurnPredictionGraphService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                    this.projectId = params.projectId;
                }
            );
        this.offerStrategyPercent = 65;
        this.advStrategyPercent = 55;
        this.churnPredictionGraphService.getChurnPredictionResult(this.projectId)
            .subscribe((data) => {
                if (data.success) {
                    this.churnPredictionResultRate = data.data;
                }
            });
    }

}
