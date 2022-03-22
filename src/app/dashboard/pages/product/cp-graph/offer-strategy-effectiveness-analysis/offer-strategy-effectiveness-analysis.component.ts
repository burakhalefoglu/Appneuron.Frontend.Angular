import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoreService} from '@app/core/services/core.service';
import { OfferModel } from '@app/dashboard/pages/product/cp-remote/models/offer-model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { ChurnPredictionGraphService } from '../../services/churn-prediction-graph.service';
import {ChurnPredictionGraphFilterService} from '../churn-prediction-graph-filter.service';

@Component({
  selector: 'app-offer-strategy-effectiveness-analysis',
  templateUrl: './offer-strategy-effectiveness-analysis.component.html',
  styleUrls: ['./offer-strategy-effectiveness-analysis.component.scss'],
})
export class OfferStrategyEffectivenessAnalysisComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  SuccessPercent: number;
  SuccessType = 'success';

  FailPercent: number;
  FailType = 'danger';

  NoActionPercent: number;
  NoActionType = 'info';

  offerStrategies: Array<OfferModel> = new Array<OfferModel>();
  selectedStrategy: string;
  projectID: any;

  constructor(
    private churnPredictionApiService: ChurnPredictionGraphService,
    private churnPredictionGraphFilterService: ChurnPredictionGraphFilterService,
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
    this.getOfferStrategies();
  }

  getOfferStrategies(): void {
    this.churnPredictionApiService
      .getOfferRemoteSettingsFromHistory(this.projectID)
      .subscribe((dataArray) => {
        if (dataArray.success) {
          this.offerStrategies = dataArray.data;
        }
      });
  }

  offerTypeHanler(
    name: string,
    version: number,
    startTime: number,
    finishTime: number
  ): void {
    this.selectedStrategy = name + ' : ' + version + ':' + new Date(startTime * 1000) + ':' + new Date(finishTime * 1000);
    this.churnPredictionApiService
      .getOfferBehaviorDtoList(this.projectID, name, version)
      .subscribe((dataArray) => {
        if (dataArray.success) {
          this.churnPredictionApiService
            .getChurnPredictionCountByOfferDate(
              this.projectID,
              name,
              version,
              new Date(startTime * 1000),
              new Date(finishTime * 1000)
            )
            .subscribe((data) => {
              if (data.success) {
                const result =
                  this.churnPredictionGraphFilterService.filterOfferBehavior(
                    dataArray.data,
                    data.data
                  );
                this.SuccessPercent = result.SuccessPercent;
                this.FailPercent = result.FailPercent;
                this.NoActionPercent = result.NoActionPercent;
              }
            });
        }
      });
  }
}
